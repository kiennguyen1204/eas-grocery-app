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
        onPress={handleSelect(value)}>
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

export default memo(Dropdown);
