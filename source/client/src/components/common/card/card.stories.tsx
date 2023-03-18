import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './card';
import { CardSkeleton } from './card-skeleton';

export default {
  title: 'Card',
  component: Card,
  subcomponents: { CardSkeleton },
} as ComponentMeta<typeof Card>;

const DefaultTemplate: ComponentStory<typeof Card> = (properties) => (
  <Card {...properties} />
);

export const Default = DefaultTemplate.bind({});
Default.args = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.`,
  title: 'Golden eye cat at garden',
  categories: ['cats', 'cute', 'animals'],
  imageSrc: 'https://picsum.photos/500/500',
};

const SkeletonTemplate: ComponentStory<typeof Card> = (properties) => (
  <CardSkeleton {...properties} />
);

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua.`,
  title: 'Golden eye cat at garden',
  categories: ['cats', 'cute', 'animals'],
};
Skeleton.parameters = {
  backgrounds: { default: 'dark' },
};
