import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotFoundCard } from './';

export default {
  title: 'Not found card',
  component: NotFoundCard,
} as ComponentMeta<typeof NotFoundCard>;

const DefaultTemplate: ComponentStory<typeof NotFoundCard> = () => (
  <NotFoundCard />
);

export const Default = DefaultTemplate.bind({});
