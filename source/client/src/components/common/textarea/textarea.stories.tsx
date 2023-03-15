import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Textarea } from './';

export default {
  title: 'Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const DefaultTemplate: ComponentStory<typeof Textarea> = (properties) => (
  <Textarea {...properties} />
);

export const Default = DefaultTemplate.bind({});
