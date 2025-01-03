type TRefactoredComponentProps = {
  className?: string
}

const RefactoredComponent = ({ className = '' }: TRefactoredComponentProps) => {
  return <div className={`${className} w-1/2`}>RefactoredComponent</div>
}

export default RefactoredComponent
