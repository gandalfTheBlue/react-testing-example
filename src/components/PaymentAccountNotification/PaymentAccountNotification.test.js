import React from 'react'
import { render, screen } from '@testing-library/react'
import PaymentAccountNotification from './PaymentAccountNotification'

describe('<PaymentAccountNotification/>', () => {
  test('test the makePaymentFlow cancel message is showed', () => {
    render(<PaymentAccountNotification flow="makePaymentFlow" />)
    expect(screen.getByTextd('textbox')).toBeEmptyDOMElement()
  })
})
