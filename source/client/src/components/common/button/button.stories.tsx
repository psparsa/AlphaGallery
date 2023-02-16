import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Click on Me',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (properties) => (
  <Button {...properties}>{properties.children}</Button>
);

export const Default = Template.bind({});
export const Red = Template.bind({});
Red.args = {
  variant: 'red',
};
export const Dark = Template.bind({});
Dark.args = {
  variant: 'dark',
};
