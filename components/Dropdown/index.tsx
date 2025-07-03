import { memo, ReactNode, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { Text } from '@/components';

// Interfaces
import { ICategory } from '@/interfaces';

// Themes
import { baseColors, fontsFamily } from '@/themes';

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

  const renderItem = ({ item }: { item: ICategory }) => {
    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={handleSelect(item.value)}>
        <Text
          color={baseColors.whitePure}
          size="xs"
          style={styles.dropdownItemText}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={handlePress(true)}
        disabled={isDisabled}>
        {rightIcon && <View>{rightIcon}</View>}
        <Text
          color={baseColors.whitePure}
          size="xs"
          style={{ textTransform: 'capitalize' }}>
          {selectedValue === '' ? defaultValue : selectedValue}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal visible={isDropdownOpen} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={handlePress(false)}>
          <View style={styles.dropdownList}>
            <FlatList
              data={options}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    ...Platform.select({
      ios: {
        paddingHorizontal: 12,
      },
      android: {
        paddingHorizontal: 20,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: baseColors.whitePure,
    borderRadius: 23,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: baseColors.grayMedium,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownList: {
    backgroundColor: baseColors.whitePure,
    borderRadius: 8,
    width: '80%',
    maxHeight: 200,
    padding: 10,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: baseColors.grayMedium,
    fontFamily: fontsFamily.medium,
  },
});

export default memo(Dropdown);
