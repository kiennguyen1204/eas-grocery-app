import { STORES } from '@/mocks';
import { render } from '@testing-library/react-native';
import StoreList from '../';

describe('StoreList Component', () => {
  it('renders correctly with image and store name', () => {
    const container = render(<StoreList stores={STORES} />);
    expect(container).toMatchSnapshot();
  });
});
