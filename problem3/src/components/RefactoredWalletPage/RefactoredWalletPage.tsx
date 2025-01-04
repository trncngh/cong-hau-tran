import RefactoredWalletRow from '@/components/RefactoredWalletRow/RefactoredWalletRow'
import { FormattedWalletBalance } from '@/types/WalletBalance.type'

type TRefactoredWalletPageProps = {
  balances: FormattedWalletBalance[]
}

const RefactoredWalletPage = ({
  className = '',
  balances,
}: TRefactoredWalletPageProps & { className?: string }) => {
  return (
    <div className={`${className}`}>
      {balances.map((balance: FormattedWalletBalance, index: number) => {
        return (
          <RefactoredWalletRow
            currency={balance.currency}
            formattedAmount={balance.formattedAmount}
            usdValue={balance.usdValue}
            key={balance.currency} // This is not a good key, but it's the only unique value in the object
          />
        )
      })}
    </div>
  )
}

export default RefactoredWalletPage
