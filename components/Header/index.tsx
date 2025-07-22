import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Components
import Dropdown from '../Dropdown';
import CartIcon from '../icons/Cart';
import CategoryIcon from '../icons/Category';
import HeartOutlineIcon from '../icons/HeartOutline';
import MapIcon from '../icons/Map';
import SearchIcon from '../icons/Search';
import SortIcon from '../icons/Sort';
import Input from '../Input';
import Text from '../Text';

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

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
        <Text
          style={styles.heading}
          color={baseColors.whitePure}
          size="xl"
          accessible={true}
          accessibilityRole="header">
          {title}
        </Text>
        <View style={styles.groupNav}>
          <TouchableOpacity
            style={styles.navLink}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.FAVORITES_BUTTON}
            accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.FAVORITES_BUTTON}>
            <HeartOutlineIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navLink}
            testID="cart-button"
            onPress={handleNavigation}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_ITEMS_COUNT(
              totalQuantity,
            )}
            accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.CART_BUTTON}>
            <View
              style={styles.totalQuantity}
              accessible={true}
              accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CART_ITEMS_COUNT(
                totalQuantity,
              )}>
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
