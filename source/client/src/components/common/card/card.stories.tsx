import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './card';

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (properties) => (
  <Card {...properties} />
);

export const Default = Template.bind({});
Default.args = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.`,
  title: 'Golden eye cat at garden',
  categories: ['cats', 'cute', 'animals'],
};
