import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import RefactoredWalletPage from './RefactoredWalletPage'

describe('RefactoredWalletPage Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the RefactoredWalletPage component', () => {
        render(<RefactoredWalletPage />)
        expect(screen.getByText('RefactoredWalletPage')).toBeInTheDocument()
})
})