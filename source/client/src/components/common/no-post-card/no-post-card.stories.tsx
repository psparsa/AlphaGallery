import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { NoPostCard } from './';

export default {
  title: 'NoPost card',
  component: NoPostCard,
} as ComponentMeta<typeof NoPostCard>;

const DefaultTemplate: ComponentStory<typeof NoPostCard> = () => <NoPostCard />;

export const Default = DefaultTemplate.bind({});
