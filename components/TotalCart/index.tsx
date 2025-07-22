import { View } from 'react-native';

// Components
import { Text } from '@/components';

// Themes
import { baseColors } from '@/themes';

// Utils
import { formatAmountNumber } from '@/utils';

// Styles
import { styles } from './styles';

export type TTotalCart = {
  totalPrice: number;
  totalQuantity: number;
};

const TotalCart = ({ totalPrice, totalQuantity }: TTotalCart) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.groupInfo}>
        <Text style={styles.textHeading} size="md" color={baseColors.blackPure}>
          Price Details
        </Text>
        <View style={styles.infoItem}>
          <Text color={baseColors.blackPure}>
            Price ({totalQuantity} {totalQuantity > 1 ? 'items' : 'item'})
          </Text>
          <Text color={baseColors.blackPure}>
            ${formatAmountNumber(totalPrice.toString())}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text color={baseColors.blackPure}>Delivery fee</Text>
          <Text color={baseColors.blackPure}>Info</Text>
        </View>
      </View>
      <View style={styles.totalAmount}>
        <Text style={styles.textHeading} size="md" color={baseColors.blackPure}>
          Total Amount
        </Text>
        <Text style={styles.textHeading} size="md" color={baseColors.blackPure}>
          ${formatAmountNumber(totalPrice.toString())}
        </Text>
      </View>
    </View>
  );
};

export default TotalCart;
