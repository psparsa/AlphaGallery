import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';

export default {
  component: Button,
  args: {
    children: 'Download',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (arguments_) => (
  <Button {...arguments_} />
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
