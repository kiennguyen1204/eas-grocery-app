import { memo } from 'react';
import isEqual from 'react-fast-compare';
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
  const renderItem = ({
    item: { id, imageUrl, storeName, logoLetter },
  }: {
    item: Store;
  }) => (
    <StoreCard
      key={id}
      id={id}
      imageUrl={imageUrl}
      storeName={storeName}
      logoLetter={logoLetter}
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

export default memo(StoreList, isEqual);
