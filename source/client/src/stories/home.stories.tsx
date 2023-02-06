import Home from '../pages/index';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';

export default {
  title: 'Pages/Home',
  component: Home,
} as ComponentMeta<typeof Home>;

export const Template: ComponentStory<typeof Home> = () => <Home />;

export const Default: ComponentStory<typeof Home> = Template.bind({});
