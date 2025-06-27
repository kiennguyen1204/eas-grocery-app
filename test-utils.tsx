import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  renderHook as rtlRenderHook,
} from '@testing-library/react-native';
import { PropsWithChildren, ReactElement } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
    },
  },
});

export const AllTheProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const customRender = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook = (renderCallback: any, options?: any) =>
  rtlRenderHook(renderCallback, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render, customRenderHook as renderHook };
