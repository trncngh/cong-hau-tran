/**
 * @hook useWalletBalances
 * @description This hook is used to get the wallet balances of the user.
 * @returns {WalletBalance[]} An array of wallet balances.
 */

import { WalletBalance } from '@/types/WalletBalance.type'

export const useWalletBalances = (): WalletBalance[] => {
  // return mock data for wallet balances
  const balances: WalletBalance[] = [
    { blockchain: 'Osmosis', currency: 'OSMO', amount: 100 },
    { blockchain: 'Ethereum', currency: 'ETH', amount: 50 },
    { blockchain: 'Terra', currency: 'LUN', amount: 50 },
  ]
  return balances
}
