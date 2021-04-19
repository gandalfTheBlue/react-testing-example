/*
<Project Name> Component
AutoPayCancellation
*/
import React, {
  useContext,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from 'react'
import i18n from '../../../../localization/i18n'
import * as rk from '../../../../localization/resourceKeys'
import { AutoPayContext } from '../../../../context/AutoPayContext'
import BannerNotification from '../../../components/common/banner-notification/BannerNotification'
import { deleteAutoPayDetails } from '../../../../services/autopay-service'
import '../AutoPayCancellation.scss'
import ErrorComponent from '../../../components/common/ErrorComponent'
import { AuthContext } from '../../../../context/AuthContext'
import { AccountContext } from '../../../../context/AccountContext'
import { AppContext } from '../../../../context/AppContext'
import { formatDate, postMessage } from '../../../../utility/Utilities'
import { constants } from '../../../../constants'
import AutoPayCancellationDetails from '../AutoPayCancellationDetails'

// eslint-disable-next-line no-empty-pattern
const AutoPayCancellation = forwardRef(({}, ref) => {
  const autoPayContext = useContext(AutoPayContext)
  // console.log('autoPayContext ======> ', autoPayContext);
  const authContext = useContext(AuthContext)
  const authState = authContext.state || {}
  // console.log('auth context ======>', authContext);
  const accountContext = useContext(AccountContext)
  // console.log('account context ========>', accountContext);
  const appContext = useContext(AppContext)
  const targetRef = useRef()
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    targetRef.current && targetRef.current.focus()
  }, [])

  const { cancelResponse } = autoPayContext?.autoPayAccountDetails
  const cancellationErrorMessage = cancelResponse?.errorMessage

  const getCustomErrorMessage = () => {
    if (cancellationErrorMessage === constants.AUTOPAY_DELETE_CONFLICT) {
      return i18n.t(rk.API_ERROR_AUTOPAY_CREATE_AND_DELETE_CONFLICT)
    }
    return undefined
  }

  /**
   * Cancel autopay action
   * @param flowContxt the flow context invoking this action
   * @returns {Promise<boolean>}
   */
  async function cancelAutopay(flowContext) {
    const { setCancelResponse } = autoPayContext
    const { appProps } = appContext
    let errorDetails
    try {
      const res = await deleteAutoPayDetails(authState)
      // console.log('submitted ', res);
      if (res) {
        setCancelResponse({
          data: res,
        })
      }
      // throw message to parent domain if it exists
      postMessage(
        appProps.parentDomain,
        constants.MessageTypes.AUTOPAY_CANCEL_COMPLETE
      )
      // This is printing the Completed AutoPayCancellationFlow twice.
      // console.info(`Completed ${flowContext.modalProps.flowState.name}`);
      return true
    } catch (err) {
      console.error('autopay cancellation error ====>', err.response)
      postMessage(
        appProps.parentDomain,
        constants.MessageTypes.AUTOPAY_CANCEL_ERROR
      )
      errorDetails = err?.response?.data?.errors?.[0]?.code
      setCancelResponse({
        errorMessage: errorDetails || 'Failed to Submit the request.',
      })
      console.info(`Error ${flowContext.modalProps.flowState.name}`)
      return false
    }
  }
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({ cancelAutopay }))
  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <div className="u-12/12 u-1/1@s autopay-cancellation">
      {cancellationErrorMessage && (
        <div data-testid="cancellation-message-container">
          <ErrorComponent message={getCustomErrorMessage()} />
        </div>
      )}
      <BannerNotification notificationStyle="warning">
        {i18n.t(rk.AUTO_PAY_CANCELLATION_WARNING)}
        {`${
          formatDate(accountContext?.account?.dueAmount?.dueDate?.value) || null
        }`}
        .
      </BannerNotification>
      <h3
        className="u-text-center u-mt-large u-pb-none ariaNoBorder"
        tabIndex="0"
        aria-label={`${i18n.t(rk.AUTO_PAY_CANCEL_TEXT)}`}
        data-testid="autopay-cancellation-warning"
      >
        {i18n.t(rk.AUTO_PAY_CANCEL_TEXT)}
      </h3>
      <span className="u-mv-large">
        <hr />
      </span>

      <AutoPayCancellationDetails />

      <br />
    </div>
  )
})

export default AutoPayCancellation
