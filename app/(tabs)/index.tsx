import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Banner,
  Button,
  CartIcon,
  CategoryList,
  HeartIcon,
  Input,
  ProductList,
  SearchIcon,
  StoreList,
  Text,
} from '@/components';

// Mocks
import { CATEGORIES, PRODUCTS, STORE_CARDS } from '@/mocks';

// Themes
import { baseColors, fontsFamily, fontWeights } from '@/themes';

const HomeScreen = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text color={baseColors.whitePure} size="xl" fontFamily="bold">
            Groceries
          </Text>
          <View style={styles.icon}>
            <HeartIcon />
            <CartIcon />
          </View>
        </View>

        <Input
          leftIcon={<SearchIcon color={baseColors.greenLight} />}
          value=""
          placeholder="Search Product"
        />
      </View>
      <ScrollView>
        <View style={styles.banner}>
          <Banner />
        </View>
        <CategoryList data={CATEGORIES} onPress={id => console.log(id)} />
        <View style={styles.product}>
          <View style={styles.productHeading}>
            <Text color={baseColors.grayMedium} style={styles.productTitle}>
              New Product
            </Text>
            <Button title="See All" size="small" style={styles.button} />
          </View>

          <ProductList products={PRODUCTS} />
        </View>

        <View style={styles.storesHeading}>
          <Text style={styles.storesTitle}>Store to follow</Text>
          <Button
            title="View All"
            size="small"
            variant="secondary"
            style={styles.btnViewAll}
          />
        </View>
        <View style={styles.storeList}>
          <StoreList stores={STORE_CARDS} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: baseColors.greenDark,
    padding: 16,
    gap: 16,
  },
  icon: {
    flexDirection: 'row',
    gap: 16,
  },
  header: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner: {
    marginBottom: 16,
  },

  product: {
    marginTop: 16,
    padding: 8,
    gap: 8,
  },
  productHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: baseColors.greenDark,
  },
  btnViewAll: {
    paddingVertical: 6,
    borderRadius: 16,
  },

  storesHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: baseColors.greenDark,
    paddingTop: 16,
  },
  storesTitle: {
    color: baseColors.whitePure,
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    height: 184,
  },
  storeList: {
    bottom: 120,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
