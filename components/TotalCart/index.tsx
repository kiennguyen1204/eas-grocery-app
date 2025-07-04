import { StyleSheet, View } from 'react-native';

// Components
import { Text } from '@/components';

// Themes
import { baseColors, fontsFamily } from '@/themes';

// Utils
import { formatAmountNumber } from '@/utils';

export type TTotalCart = {
  totalPrice: number;
  totalQuantity: number;
};

const TotalCart = ({ totalPrice, totalQuantity }: TTotalCart) => (
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

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: fontsFamily.bold,
  },
  wrapper: {
    backgroundColor: baseColors.whitePure,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  groupInfo: {
    padding: 15,
    flexDirection: 'column',
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalAmount: {
    padding: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: baseColors.grayExtraLight,
    justifyContent: 'space-between',
  },
});

export default TotalCart;
