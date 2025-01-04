import WalletPage from '@/components/WalletPage/WalletPage'

type TOriginComponentProps = {
  className?: string
}

const OriginComponent = ({ className = '' }: TOriginComponentProps) => {
  return (
    <div className={`${className} w-1/2`}>
      OriginComponent
      <WalletPage />
    </div>
  )
}

export default OriginComponent