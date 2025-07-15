import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Components
import {
  CartIcon,
  CategoryIcon,
  Dropdown,
  HeartOutlineIcon,
  Input,
  MapIcon,
  SearchIcon,
  SortIcon,
  Text,
} from '@/components';

// Interface
import { ICategory } from '@/interfaces';

// Themes
import { baseColors } from '@/themes';

// Styles
import { styles } from './styles';

export type HeaderProps = {
  title: string;
  totalQuantity: number;
  optionSort?: ICategory[];
  optionCategory?: ICategory[];
  isBrowse?: boolean;
  isSearch?: boolean;
  onChangeText?: (value: string) => void;
  onSelect?: (value: string) => void;
  onCategorySelect?: (value: string) => void;
  onNavigate?: () => void;
};

const HeaderComponent = ({
  title,
  isBrowse,
  isSearch,
  optionSort,
  totalQuantity,
  optionCategory,
  onChangeText,
  onSelect,
  onCategorySelect,
  onNavigate,
}: HeaderProps) => {
  const handleSearch = (value: string) => {
    onChangeText && onChangeText(value);
  };

  const handleNavigation = () => {
    onNavigate && onNavigate();
  };

  return (
    <View style={[styles.wrapper, { height: isBrowse ? 226 : 170 }]}>
      <View style={styles.subHeader}>
        <Text style={styles.heading} color={baseColors.whitePure} size="xl">
          {title}
        </Text>
        <View style={styles.groupNav}>
          <TouchableOpacity style={styles.navLink}>
            <HeartOutlineIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navLink}
            testID="cart-button"
            onPress={handleNavigation}>
            <View style={styles.totalQuantity}>
              <Text
                size="xs"
                color={baseColors.whitePure}
                style={styles.textQuantity}>
                {totalQuantity}
              </Text>
            </View>
            <CartIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.feature, { gap: isBrowse ? 32 : 0 }]}>
        {isSearch && (
          <Input
            leftIcon={<SearchIcon color={baseColors.greenLight} />}
            placeholder="Search Product"
            onChangeText={handleSearch}
          />
        )}

        {isBrowse && (
          <View style={styles.groupDropdown}>
            <Dropdown
              defaultValue="Sort by price"
              options={optionSort}
              onSelect={onSelect}
              rightIcon={<SortIcon />}
            />
            <Dropdown
              defaultValue="location"
              isDisabled
              rightIcon={<MapIcon />}
            />
            <Dropdown
              defaultValue="Category"
              options={optionCategory}
              onSelect={onCategorySelect}
              rightIcon={<CategoryIcon />}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(HeaderComponent);
