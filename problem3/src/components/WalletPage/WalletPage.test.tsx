import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import WalletPage from './WalletPage'

describe('WalletPage Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the WalletPage component', () => {
        render(<WalletPage />)
        expect(screen.getByText('WalletPage')).toBeInTheDocument()
})
})