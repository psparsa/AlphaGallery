import { Pagination } from './pagination';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (properties) => (
  <Pagination {...properties} />
);

export const Default: ComponentStory<typeof Pagination> = Template.bind({});
Default.parameters = {
  backgrounds: { default: 'dark' },
};
