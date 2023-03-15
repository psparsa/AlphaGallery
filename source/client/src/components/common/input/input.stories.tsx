import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const DefaultTemplate: ComponentStory<typeof Input> = (properties) => (
  <Input {...properties} />
);

export const Default = DefaultTemplate.bind({});
