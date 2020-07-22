import React from 'react'
import i18n from '../../../../localization/i18n'
import * as rk from '../../../../localization/resourceKeys'

import './CancelNotification.css'

const CancelNotification = ({ flow }) => {
  //different flows:
  //payment flow
  //autopay
  //add payment acct

  const FlowMessages = {
    makePaymentFlow: i18n.t(rk.TEXT_CANCEL_CONFIRMATION_INFO),
    autopayEnrollFlow: i18n.t(rk.TEXT_CANCEL_CONFIRMATION_INFO),
    addPaymentSccountFlow: i18n.t(rk.TEXT_CANCEL_CONFIRMATION_INFO),
  }

  const flowMessage = FlowMessages[flow]

  return (
    <div>
      <div>{i18n.t(rk.TEXT_CANCEL_CONFIRMATION)}</div>
      <div>{flowMessage}</div>
    </div>
  )
}

CancelNotification.propTypes = {
  //require one flow to id the flow
}

export default CancelNotification
