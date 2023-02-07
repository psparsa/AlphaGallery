import { Search } from './search';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';

export default {
  title: 'Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (properties) => (
  <Search {...properties} />
);

export const Default: ComponentStory<typeof Search> = Template.bind({});
