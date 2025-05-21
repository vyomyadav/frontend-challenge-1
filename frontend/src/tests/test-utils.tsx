import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

// Custom render function that wraps components with MantineProvider
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MantineProvider defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
  
  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 