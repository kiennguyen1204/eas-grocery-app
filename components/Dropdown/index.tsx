import { memo, ReactNode, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { Text } from '@/components';

// Constants
import { ACCESSIBILITY_CONFIG } from '@/constants';

// Interfaces
import { ICategory } from '@/interfaces';

// Themes
import { baseColors } from '@/themes';

// Styles
import { styles } from './styles';

export type DropdownProps = {
  defaultValue: string;
  options?: ICategory[];
  rightIcon?: ReactNode;
  isDisabled?: boolean;
  onSelect?: (value: string) => void;
};

const Dropdown = ({
  defaultValue,
  options = [],
  rightIcon,
  isDisabled,
  onSelect,
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value: string) => {
    return (event: GestureResponderEvent) => {
      onSelect && onSelect(value);
      setSelectedValue(value);
      setIsDropdownOpen(false);
    };
  };

  const handlePress = (press: boolean) => {
    return (event: GestureResponderEvent) => {
      setIsDropdownOpen(press);
    };
  };

  const keyExtractor = (item: ICategory, index: number) => item.id.toString();

  const renderItem = ({ item: { value, title } }: { item: ICategory }) => {
    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={handleSelect(value)}
        accessible={true}
        accessibilityRole="menuitem"
        accessibilityLabel={title}
        accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.DROPDOWN_OPTION(title)}>
        <Text
          color={baseColors.whitePure}
          size="xs"
          style={styles.dropdownItemText}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={handlePress(true)}
        disabled={isDisabled}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.DROPDOWN_BUTTON(
          defaultValue,
          selectedValue === '' ? defaultValue : selectedValue,
        )}
        accessibilityHint={
          isDisabled
            ? ACCESSIBILITY_CONFIG.HINTS.DROPDOWN_DISABLED
            : ACCESSIBILITY_CONFIG.HINTS.DROPDOWN_BUTTON
        }
        accessibilityState={{
          disabled: isDisabled,
          expanded: isDropdownOpen,
        }}>
        {rightIcon && (
          <View
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.DROPDOWN_ICON}>
            {rightIcon}
          </View>
        )}
        <Text
          color={baseColors.whitePure}
          size="xs"
          style={{ textTransform: 'capitalize' }}>
          {selectedValue === '' ? defaultValue : selectedValue}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        accessible={true}
        accessibilityViewIsModal={true}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={handlePress(false)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.CLOSE_DROPDOWN}
          accessibilityHint={ACCESSIBILITY_CONFIG.HINTS.CLOSE_DROPDOWN}>
          <View
            style={styles.dropdownList}
            accessible={true}
            accessibilityRole="menu"
            accessibilityLabel={ACCESSIBILITY_CONFIG.LABELS.DROPDOWN_MENU(
              defaultValue,
            )}>
            <FlatList
              data={options}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              accessible={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default memo(Dropdown);
