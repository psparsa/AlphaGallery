import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './card';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (arguments_) => (
  <Card {...arguments_} />
);

export const Default = Template.bind({});
Default.args = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.`,
  title: 'Golden eye cat at garden',
  categories: ['cats', 'cute', 'animals'],
};
