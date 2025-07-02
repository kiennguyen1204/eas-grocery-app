import { FlatList } from 'react-native';

// Components
import { StoreCard } from '@/components';

type Store = {
  id: string;
  imageUrl: string;
  storeName: string;
  logoLetter: string;
};

type StoreListProps = {
  stores: Store[];
};

const StoreList = ({ stores }: StoreListProps) => {
  const renderItem = ({ item }: { item: Store }) => (
    <StoreCard
      key={item.id}
      id={item.id}
      imageUrl={item.imageUrl}
      storeName={item.storeName}
      logoLetter={item.logoLetter}
    />
  );

  return (
    <FlatList
      horizontal
      data={stores}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default StoreList;
