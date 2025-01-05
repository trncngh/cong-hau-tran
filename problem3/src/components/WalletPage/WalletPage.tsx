/**
 * This is an original messy React component.
 * It is unable to run because of missing dependencies, hooks, WalletRow components, and wrong types defined.
 * So I assume that all the hooks are working properly,
 * and WalletRow component is a simple component that takes props and renders them.
 */
import WalletRow from '@/components/WalletRow/WalletRow'
import { Prices } from '@/types/WalletBalance.type'
import { useMemo } from 'react'

/**
 * declare missing hooks
 */

const usePrices = (): Prices => {
  // return mock data for prices
  const prices = {
    OSMO: 0.14,
    ETH: 50,
  }
  return prices
}
export const useWalletBalances = (): WalletBalance[] => {
  // return mock data for wallet balances
  const balances: WalletBalance[] = [
    { blockchain: 'Osmosis', currency: 'OSMO', amount: 100 },
    { blockchain: 'Ethereum', currency: 'ETH', amount: 50 },
    { blockchain: 'Terra', currency: 'LUN', amount: 50 },
  ]
  return balances
}

interface WalletBalance {
  currency: string
  amount: number
  blockchain: string //missing blockchain property to define the blockchain type
}
interface FormattedWalletBalance {
  // this interface can be extended from WalletBalance
  currency: string
  amount: number
  formatted: string
}

/**
 * define missing BoxProps type
 */
interface BoxProps {
  children?: React.ReactNode
  className?: string
}

interface Props extends BoxProps {} // BoxProps is missing here, so I assume it is a type being defined somewhere else.
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props // using ambigous ...rest operator, it should be defined as Props
  const balances = useWalletBalances()
  const prices = usePrices()

  // this function should be defined outside of the component
  const getPriority = (blockchain: any): number => {
    // any type is used here, it should have better type definition, eg. string
    switch (blockchain) {
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

  /**
   * This function seems to return a sorted balances array for element that has priority > 99 (from the getPriority)
   * but the filter isnt implemented correctly.
   * that leads to the sort function always returns empty array []
   * hence, even if all data is fetched and all errors are fixed this component woulnd render anything on client side
   * this function should be defined outside of the component
   */
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        // if (lhsPriority > -99) { // lhsPriority is not defined, it should be balancePriority
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            return true
          }
        }
        return false
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        if (leftPriority > rightPriority) {
          return -1
        } else if (rightPriority > leftPriority) {
          return 1
        }
        // missing return statement for equal priorities in sort method
        return 0
      })
  }, [balances, prices])

  /**
   * same as the sortedBalances, this function should be defined outside of the component
   */
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    }
  })

  //   const rows = sortedBalances.map(   // it should be formattedBalances
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // the purpose of this function is just to format the amount and returns the WalletRow component, so calculating the usdValue here is go against the single responsibility principle
      const usdValue = prices[balance.currency] * balance.amount
      // the WalletRow is considered as atom (or molecule) component, it should only display the formatted amount, providing amount here is unnecessary
      // furthermore, it should display the currency as well
      // if the main purpose of this component is to display the formatted amount, then all the data should be displayed as a data table.
      return (
        <WalletRow
          // className={classes.row} classes is not defined
          key={index} // using array index as key is not recommended
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}

// missing export statement
export default WalletPage

/**
 * The WalletPage component is a messy component that has several issues:
 * 1. Missing dependencies: useWalletBalances, WalletRow, BoxProps, React, useMemo
 * 2. Wrong types defined: WalletBalance, FormattedWalletBalance
 * 3. Wrong logic: getPriority function, sortedBalances, rows
 * 4. Missing export statement
 * Original WalletRow also has issues, it should only display the formatted amount, providing amount here is unnecessary and it's not display the currency.
 */
