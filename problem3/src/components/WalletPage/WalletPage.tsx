/**
 * This is an original messy React component.
 * It is unable to run because of missing dependencies, hooks, WalletRow components, and wrong types defined.
 * So I assume that all the hooks are working properly,
 * and WalletRow component is a simple component that takes props and renders them.
 */
import WalletRow from '@/components/WalletRow/WalletRow'
import { usePrices } from '@/hooks/usePrices'
import { useWalletBalances } from '@/hooks/useWalletBalances' //importing missing useWalletBalances hook
import { useMemo } from 'react'
interface WalletBalance {
  currency: string
  amount: number
  blockchain: string //missing blockchain property to define the blockchain type
}
interface FormattedWalletBalance {
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
  const { children, ...rest } = props //
  const balances = useWalletBalances()
  const prices = usePrices()

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

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    }
  })
  console.log('balances', balances)
  console.log('prices', prices)
  console.log('sortedBalances', sortedBalances)

  //   const rows = sortedBalances.map(   // it should be formattedBalances
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      // the WalletRow is considered as atom (or molecule) component, it should only display the formatted amount, providing amount here is unnecessary
      return (
        <WalletRow
          // className={classes.row} classes is not defined
          key={index}
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
