import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './card';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = () => <Card />;

export const Default = Template.bind({});
