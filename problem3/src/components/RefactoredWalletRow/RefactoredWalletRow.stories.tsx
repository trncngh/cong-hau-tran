import type { Meta, StoryObj } from '@storybook/react'

import RefactoredWalletRow from './RefactoredWalletRow'

const meta = {
  component: RefactoredWalletRow,
} satisfies Meta<typeof RefactoredWalletRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    usdValue: 100,
    formattedAmount: '100',
    currency: 'USDT',
  },
}
