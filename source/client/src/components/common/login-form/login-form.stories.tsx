import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginForm } from './';
import { ReactQueryProvider } from '@/providers/react-query-provider';

export default {
  title: 'LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const DefaultTemplate: ComponentStory<typeof LoginForm> = (properties) => (
  <ReactQueryProvider>
    <LoginForm {...properties} />
  </ReactQueryProvider>
);

export const Default = DefaultTemplate.bind({});
