import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import RefactoredWalletRow from './RefactoredWalletRow'

describe('RefactoredWalletRow Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the RefactoredWalletRow component', () => {
        render(<RefactoredWalletRow />)
        expect(screen.getByText('RefactoredWalletRow')).toBeInTheDocument()
})
})