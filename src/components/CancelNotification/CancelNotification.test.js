import React from 'react'
import { render, screen } from '@testing-library/react'
import CancelNotification from './CancelNotification'
import i18n from '../../../../localization/i18n'
import * as rk from '../../../../localization/resourceKeys'

describe('<CancelNotification/>', () => {
  test(' cancel tittle message is rendered', () => {
    render(<CancelNotification flow="makePaymentFlow" />)
    expect(
      screen.getByText(i18n.t(rk.TEXT_CANCEL_CONFIRMATION))
    ).toBeInTheDocument()
  })

  test('test the makePaymentFlow cancel message is rendered', () => {
    render(<CancelNotification flow="makePaymentFlow" />)
    expect(
      screen.getByText(i18n.t(rk.TEXT_CANCEL_CONFIRMATION_INFO))
    ).toBeInTheDocument()
  })

  test('test the autopayEnrollFlow message is rendered', () => {
    render(<CancelNotification flow="autopayEnrollFlow" />)
    expect(
      screen.getByText(i18n.t(rk.TEXT_CANCEL_CONFIRMATION_INFO))
    ).toBeInTheDocument()
  })

  test('test the addPaymentSccountFlow message is rendered', () => {
    render(<CancelNotification flow="addPaymentSccountFlow" />)
    expect(
      screen.getByText(i18n.t(rk.TEXT_CANCEL_CONFIRMATION_INFO))
    ).toBeInTheDocument()
  })
})
