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
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
            <th>Value(USDT)</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  )
}

export default RefactoredWalletPage
