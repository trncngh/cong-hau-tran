import type { Meta, StoryObj } from '@storybook/react';

import WalletPage from './WalletPage';

const meta = {
  component: WalletPage,
} satisfies Meta<typeof WalletPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};