/**
 * @hook usePrices
 * @description This hook is used to get the prices of the currencies.
 * @returns
 */

import { Prices } from '@/types/WalletBalance.type'

export const usePrices = (): Prices => {
  // return mock data for prices
  const prices = {
    OSMO: 0.14,
    ETH: 50,
  }
  return prices
}
