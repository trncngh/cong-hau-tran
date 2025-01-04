type TWalletRowProps = {
  amount: number
  usdValue: number
  formattedAmount: string
}

const WalletRow = ({
  amount,
  usdValue,
  formattedAmount,
  className = '',
}: TWalletRowProps & { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-between`}>
      <p>
        {amount} <span>{formattedAmount}</span>
      </p>
      <p>
        <strong>{usdValue}</strong>
      </p>
    </div>
  )
}

export default WalletRow
