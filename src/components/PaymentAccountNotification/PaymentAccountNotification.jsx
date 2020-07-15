import React from 'react'

const PaymentAccountNotification = ({ messagekey }) => {
  return (
    <div className="c-notification__content">
      <p role="textbox" className="c-notification__content">
        {messagekey}
      </p>
    </div>
  )
}

export default PaymentAccountNotification
