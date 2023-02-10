import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Badge } from './badge';

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (arguments_) => (
  <Badge {...arguments_} />
);
export const Default = Template.bind({});
Default.args = {
  children: 'animal',
};
