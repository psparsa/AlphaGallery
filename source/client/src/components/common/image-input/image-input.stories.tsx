import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ImageInput } from './';

export default {
  title: 'ImageInput',
  component: ImageInput,
} as ComponentMeta<typeof ImageInput>;

const DefaultTemplate: ComponentStory<typeof ImageInput> = (properties) => (
  <ImageInput {...properties} />
);

export const Default = DefaultTemplate.bind({});
