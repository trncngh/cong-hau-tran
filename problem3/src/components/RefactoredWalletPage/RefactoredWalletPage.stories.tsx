import type { Meta, StoryObj } from '@storybook/react'

import RefactoredWalletPage from './RefactoredWalletPage'

const meta = {
  component: RefactoredWalletPage,
} satisfies Meta<typeof RefactoredWalletPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    balances: [
      {
        currency: 'LTC',
        formattedAmount: '122',
        usdValue: 1515,
        blockchain: 'Litecoin',
        amount: 131,
      },
      {
        currency: 'ETH',
        formattedAmount: '2',
        usdValue: 1314,
        amount: 2.14,
        blockchain: 'Ethereum',
      },
    ],
  },
}
