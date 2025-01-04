import type { Meta, StoryObj } from '@storybook/react'

import WalletRow from './WalletRow'

const meta = {
  component: WalletRow,
} satisfies Meta<typeof WalletRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    amount: 100,
    usdValue: 100,
    formattedAmount: 'BTC',
  },
}
