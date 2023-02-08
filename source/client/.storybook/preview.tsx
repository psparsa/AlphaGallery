import React from 'react';

import '../src/styles/globals.css';
import * as NextImage from 'next/image';
import { DecoratorFn, Parameters } from '@storybook/react';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

export const decorators: DecoratorFn[] = [
  (Story) => (
    <div className="font-light text-snow">
      <Story />
    </div>
  ),
];
