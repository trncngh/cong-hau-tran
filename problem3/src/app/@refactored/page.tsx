import RefactoredWalletPage from '@/components/RefactoredWalletPage/RefactoredWalletPage'
import { usePrices } from '@/hooks/usePrices'
import { useWalletBalances } from '@/hooks/useWalletBalances'
import { formatBalances } from '@/utils/balances'
import { useMemo } from 'react'

type TRefactoredComponentProps = {
  className?: string
}

/**
 * assuming that boths are dynamically fetch realtime data from webhooks for getting the wallet balances and prices
 */

const RefactoredComponent = ({ className = '' }: TRefactoredComponentProps) => {
  const balances = useWalletBalances()
  const prices = usePrices()
  const formattedBalances = useMemo(
    () => formatBalances(balances, prices),
    [balances, prices]
  )

  return (
    <div className={`${className} w-1/2`}>
      Refactored Component
      <RefactoredWalletPage balances={formattedBalances} />
    </div>
  )
}

export default RefactoredComponent
