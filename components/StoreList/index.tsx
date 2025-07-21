import { FlashList } from '@shopify/flash-list';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

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
    <FlashList
      horizontal
      data={stores}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={120}
    />
  );
};

export default memo(StoreList, isEqual);
