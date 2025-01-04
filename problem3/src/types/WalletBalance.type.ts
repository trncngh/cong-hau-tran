export type WalletBalance = {
  blockchain: string
  currency: string
  amount: number
}

export type Prices = {
  [currency: string]: number
}
