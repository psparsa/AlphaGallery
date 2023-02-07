import { ScrollButton } from './scroll-button';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';

export default {
  title: 'ScrollButton',
  component: ScrollButton,
} as ComponentMeta<typeof ScrollButton>;

const Template: ComponentStory<typeof ScrollButton> = (properties) => (
  <ScrollButton {...properties} />
);

export const Default: ComponentStory<typeof ScrollButton> = Template.bind({});
Default.parameters = {
  backgrounds: { default: 'dark' },
};
