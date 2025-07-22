import { FlashList } from '@shopify/flash-list';

// Components
import StoreCard from '../StoreCard';

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

export default StoreList;
