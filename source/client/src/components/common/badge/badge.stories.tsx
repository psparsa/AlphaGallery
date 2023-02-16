import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Badge } from './badge';

export default {
  title: 'Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (properties) => (
  <Badge {...properties} />
);
export const Default = Template.bind({});
Default.args = {
  label: 'animal',
};
