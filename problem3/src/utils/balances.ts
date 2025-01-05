import {
  FormattedWalletBalance,
  Prices,
  WalletBalance,
} from '@/types/WalletBalance.type'

export const getPriorityBalances = (blockChain: string): number => {
  switch (blockChain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}

export const formatBalances = (
  balances: WalletBalance[],
  prices: Prices
): FormattedWalletBalance[] => {
  return balances
    .filter((balance: WalletBalance) => {
      const balancePriority = getPriorityBalances(balance.blockchain)
      return balancePriority > -99 && balance.amount > 0
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriorityBalances(lhs.blockchain)
      const rightPriority = getPriorityBalances(rhs.blockchain)
      if (leftPriority > rightPriority) {
        return -1
      } else if (rightPriority > leftPriority) {
        return 1
      }
      return 0
    })
    .map((balance: WalletBalance) => {
      const currency = balance.currency
      const price =
        prices && currency && prices[currency] !== undefined
          ? prices[currency]
          : 1
      return {
        ...balance,
        formattedAmount: balance.amount.toFixed(2),
        usdValue: (balance.amount * price).toFixed(2),
      }
    })
}
