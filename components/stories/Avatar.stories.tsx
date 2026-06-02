import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../Avatar';

const meta: Meta<typeof Avatar> = {
  title:     'Primitives/Avatar',
  component: Avatar,
  tags:      ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default:  Story = { args: { name: 'Premium Gaming Service' } };
export const SmallLarge: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar name="Premium Gaming Service" size="sm" />
      <Avatar name="Premium Gaming Service" size="md" />
      <Avatar name="Premium Gaming Service" size="lg" />
    </div>
  ),
};
export const DeterministicTints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 480 }}>
      {[
        'Premium Gaming Service','Daily Quiz Master','Music Streaming Bundle','Sports Highlights HD',
        'Kids Stories Library','Health Coach Pro','Travel Deals Pro','Crypto Tips Premium',
      ].map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 100 }}>
          <Avatar name={name} />
          <div style={{ fontSize: 11, color: '#52525b', textAlign: 'center' }}>{name}</div>
        </div>
      ))}
    </div>
  ),
};
