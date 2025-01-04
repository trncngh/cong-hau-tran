/**
 * @hook usePrices
 * @description This hook is used to get the prices of the currencies.
 * @returns
 */

import { Prices } from '@/types/WalletBalance.type'

export const usePrices = (): Prices => {
  // return mock data for prices
  const prices = {
    OSMO: 100,
    ETH: 50,
  }
  return prices
}
