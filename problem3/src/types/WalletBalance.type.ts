export type WalletBalance = {
  blockchain: string
  currency: string
  amount: number
}

export type Prices = {
  [currency: string]: number
}

export type FormattedWalletBalance = {
  currency: string
  formattedAmount: string
  usdValue: string
}
