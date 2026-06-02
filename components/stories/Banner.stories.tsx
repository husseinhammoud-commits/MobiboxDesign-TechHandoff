import type { Meta, StoryObj } from '@storybook/react';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

import { Banner } from '../Banner';
import { Button } from '../Button';

const meta: Meta<typeof Banner> = {
  title:     'Primitives/Banner',
  component: Banner,
  tags:      ['autodocs'],
  argTypes:  { tone: { control: { type: 'inline-radio' }, options: ['info','success','warning','danger','neutral'] } },
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const Info_: Story = {
  args: { tone: 'info', icon: <Info size={16} />, children: <><strong>These settings inherit to every offer in this service.</strong> Individual offers can override pricing, country list, or operator selection.</> },
};

export const Warning: Story = {
  args: { tone: 'warning', icon: <AlertTriangle size={16} />, children: <><strong>3 CAPs need attention</strong> — review usage before traffic gets dropped.</> },
};

export const Success: Story = {
  args: { tone: 'success', icon: <CheckCircle2 size={16} />, children: 'Service launched successfully.' },
};

export const WithAction: Story = {
  args: {
    tone: 'info',
    icon: <Info size={16} />,
    children: "You're now editing the offer-specific theme override.",
    action: <Button variant="primary" size="sm">{"I'm done"}</Button>,
  },
};
