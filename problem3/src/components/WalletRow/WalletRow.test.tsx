import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import WalletRow from './WalletRow'

describe('WalletRow Component', () => {
    const handleClose = vi.fn()
    afterEach(cleanup)
    test('should render the WalletRow component', () => {
        render(<WalletRow />)
        expect(screen.getByText('WalletRow')).toBeInTheDocument()
})
})