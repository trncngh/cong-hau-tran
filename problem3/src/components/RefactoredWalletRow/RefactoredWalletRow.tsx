type TRefactoredWalletRowProps = {
  usdValue: number
  formattedAmount: string
  currency: string
}

const RefactoredWalletRow = ({
  className = '',
  usdValue,
  formattedAmount,
  currency,
}: TRefactoredWalletRowProps & { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-between`}>
      <p>
        <span>{formattedAmount}</span>
      </p>
      <p>
        <span>{currency}</span>
      </p>
      <p>
        <strong>{usdValue}</strong>
      </p>
    </div>
  )
}

export default RefactoredWalletRow
