import { FormattedWalletBalance } from '@/types/WalletBalance.type'

const RefactoredWalletRow = ({
  className = '',
  usdValue,
  formattedAmount,
  currency,
}: FormattedWalletBalance & { className?: string }) => {
  return (
    <tr>
      <td>{currency}</td>
      <td>{formattedAmount}</td>
      <td>{usdValue}</td>
    </tr>
  )
}

export default RefactoredWalletRow
