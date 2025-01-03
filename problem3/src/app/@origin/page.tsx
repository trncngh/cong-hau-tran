type TOriginComponentProps = {
  className?: string
}

const OriginComponent = ({ className = '' }: TOriginComponentProps) => {
  return <div className={`${className} w-1/2`}>OriginComponent</div>
}

export default OriginComponent
