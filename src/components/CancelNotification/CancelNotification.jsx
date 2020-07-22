import React from 'react'
import './CancelNotification.css'

const FlowMessages = {
  'make payment flow': i18n.t(MAKE_A_PAYMENT.key),
  'autopay enroll flow': i18n.t(AUTOPAY_ENROLL.key),
  'add payment account flow': i18n.t(ADD_PAYMENT_ACCOUNT.key),
}

const CancelNotification = ({ flow }) => {
  const flowMessage = FlowMessages[flow] || 18n.t(NO_FLOW.key)

  return (
    <div>
      <div>{flowMessage}</div>
    </div>
  )
}

CancelNotification.propTypes = {
  flow: String,
}

export default CancelNotification
