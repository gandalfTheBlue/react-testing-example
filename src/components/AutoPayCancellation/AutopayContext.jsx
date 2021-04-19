import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import PropTypes, { element } from 'prop-types';
import _ from 'lodash';
import { AuthContext } from './AuthContext';
import { ErrorContext } from '../common/errors/ErrorContext';
import {
  fetchAutoPayEnrollmentDetails,
  fetchPaymentProfileDetails,
  fetchExistingAutoPay,
} from '../services/payment-service';
import AutoPay from '../models/AutoPay';
import AutoPayVerify from '../models/AutoPayVerify';
import {
  ERROR_NOTIFICATION_SYSTEM_ERROR_CONTENT,
  TITLE_AUTOPAY_ENROLLMENT,
  AUTO_PAY_CANCELLATION_TITLE,
} from '../localization/resourceKeys';
import PaymentProfile from '../models/PaymentProfile';
import Spinner from '../views/components/common/spinner/Spinner';

export const AutoPayContext = createContext({
  autoPayAccountDetails: {},
  setCancelResponse: () => {},
  setAutoPaySubmissionResponse: () => {},
});

export const AutoPayContextProvider = ({
  hasAutoPayEnrollDetails,
  hasAutoPayAccount,
  hasPaymentProfile,
  isTesting,
  children,
  actionOrigin,
}) => {
  const [autoPayEnrollDetails, setAutoPayEnrollDetails] = useState({
    autoPayEnrollDetails: null,
    paymentProfile: null,
    hasPaymentProfile: hasPaymentProfile || false,
    hasAutoPayEnrollDetails: hasAutoPayEnrollDetails || false,
    cancelResponse: {},
    autoPaySubmissionResponse: {},
  });

  const [autoPayAccountsData, setAutoPayAccountsData] = useState({
    hasAutoPayAccount: hasAutoPayAccount || false,
    autoPayAccounts: null,
  });

  const [isBusy, setBusy] = useState(!isTesting);

  const [isAccountDetailsFetched, setAccountDetailsfetched] = useState(false);
  const [isEnrollDeatailsFetched, setEnrollDetailsfetched] = useState(false);

  const authContext = useContext(AuthContext);
  const authState = authContext.state || {};
  const { addError } = useContext(ErrorContext);

  const getErrorActionOrigin = () => {
    if (actionOrigin === AUTO_PAY_CANCELLATION_TITLE) {
      return actionOrigin;
    }
    return TITLE_AUTOPAY_ENROLLMENT;
  };
  const setCancelResponse = (cancelResponse) => {
    setAutoPayEnrollDetails({ ...autoPayEnrollDetails, cancelResponse });
  };

  const setAutoPaySubmissionResponse = (autoPaySubmissionResponse) => {
    setAutoPayEnrollDetails({ ...autoPayEnrollDetails, autoPaySubmissionResponse });
  };

  const fetchPaymentProfileData = useCallback(
    async (currentState) => {
      const profiles = [];

      try {
        const paymentProfileResponse = await fetchPaymentProfileDetails(authState);
        if (paymentProfileResponse?.paymentProfiles) {
          for (const p of paymentProfileResponse.paymentProfiles) {
            profiles.push(new PaymentProfile(p).viewModel());
          }
        }
        return {
          ...currentState,
          paymentProfile: [profiles],
          hasPaymentProfile: !!_.get(profiles[0], 'bankAccountNumber', ''),
        };
      } catch (err) {
        addError(
          ERROR_NOTIFICATION_SYSTEM_ERROR_CONTENT,
          'FAILED TO FETCH PAYMENT PROFILE DETAILS',
          err,
          getErrorActionOrigin()
        );
        return currentState;
      }
    },
    [addError, authState]
  );

  const fetchAutoPayAccountDetails = async (currentState) => {
    let autoPayDetails = {};

    try {
      const autoPayResponse = await fetchExistingAutoPay(authState);
      if (autoPayResponse) {
        autoPayDetails = new AutoPay(autoPayResponse).viewModel();
      }
      // console.log('Completed Fetching AutoPayAccount Details');

      setAccountDetailsfetched(true);
      return {
        ...currentState,
        autoPayAccounts: [autoPayDetails],
        hasAutoPayAccount: !!_.get(autoPayDetails, 'bankAccountNumber', ''),
      };
    } catch (err) {
      addError(
        ERROR_NOTIFICATION_SYSTEM_ERROR_CONTENT,
        'FAILED TO FETCH EXISTING AUTO PAY',
        err,
        getErrorActionOrigin()
      );
      return currentState;
    }
  };

  /**
   * fetch auto payment enrollment details
   *
   * @param currentState - the currentstate to modify
   * @param ppId - the payment profile Id
   * @returns {Promise<{autoPayEnrollDetails: [{}], hasAutoPayEnrollDetails: boolean}|*>}
   */
  const fetchAutoPayEnrollDetails = async (currentState, ppId) => {
    let autoPayDetails = {};
    try {
      const autoPayResponse = await fetchAutoPayEnrollmentDetails(authState, ppId);
      if (autoPayResponse) {
        autoPayDetails = new AutoPayVerify(autoPayResponse).viewModel();
      }

      return {
        ...currentState,
        autoPayEnrollDetails: [autoPayDetails],
        hasAutoPayEnrollDetails: true,
      };
    } catch (err) {
      addError(
        ERROR_NOTIFICATION_SYSTEM_ERROR_CONTENT,
        'FAILED TO FETCH AUTO PAY ENROLLMENT DETAILS',
        err,
        getErrorActionOrigin()
      );
      return currentState;
    }
  };

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    const fetchAccountData = async () => {
      const stateWithAccountDetails = await fetchAutoPayAccountDetails(autoPayAccountsData);
      setAutoPayAccountsData(stateWithAccountDetails);
    };
    const fetchProfileAndEnrollData = async () => {
      // console.log('After fetchAutoPayAccountDetails ===>', stateWithAccountDetails);
      const stateWithProfileDetails = await fetchPaymentProfileData(autoPayEnrollDetails);
      // console.log('After fetchPaymentProfileData', stateWithProfileDetails);
      const ppId = _.get(stateWithProfileDetails, 'paymentProfile[0][0].paymentProfileId');
      let stateWithProfileAndEnrollData = { ...stateWithProfileDetails };

      if (ppId) {
        stateWithProfileAndEnrollData = await fetchAutoPayEnrollDetails(stateWithProfileDetails, ppId);
      }

      setEnrollDetailsfetched(true);
      // console.log('Will set stateWithProfileAndEnrollData', stateWithProfileAndEnrollData);
      setAutoPayEnrollDetails(stateWithProfileAndEnrollData);
    };

    // TODO - these should be in a promise all
    fetchAccountData();
    fetchProfileAndEnrollData();
  }, [addError, authState]);

  // TODO - if above in promise all then this effect is not needed
  useEffect(() => {
    if (isAccountDetailsFetched && isEnrollDeatailsFetched) {
      setBusy(false);
    }
  }, [isAccountDetailsFetched, isEnrollDeatailsFetched]);

  const triggerAutoPayEnrollDataFetch = async (ppId) => {
    const details = await fetchAutoPayEnrollDetails(autoPayEnrollDetails, ppId);
    setAutoPayEnrollDetails(details);
  };
  // TODO - very brittle code. Assumes data structure
  const ppId = _.get(autoPayEnrollDetails, 'paymentProfile[0][0].paymentProfileId');

  useEffect(() => {
    // console.log('Evaluating Side Effect...');
    if (!autoPayEnrollDetails.autoPayEnrollDetails && ppId) {
      triggerAutoPayEnrollDataFetch(ppId);
    }
  }, [ppId, autoPayEnrollDetails.autoPayEnrollDetails]);

  const triggerPaymentProfileDataFetch = async () => {
    const details = await fetchPaymentProfileData(autoPayEnrollDetails);
    setAutoPayEnrollDetails(details);
  };

  return (
    <AutoPayContext.Provider
      value={{
        autoPayAccountDetails: { ...autoPayEnrollDetails, ...autoPayAccountsData },
        setCancelResponse,
        setAutoPaySubmissionResponse,
        triggerPaymentProfileDataFetch,
      }}
    >
      {isBusy ? <Spinner ariaLabel /> : children}
    </AutoPayContext.Provider>
  );
};

AutoPayContextProvider.propTypes = {
  children: element.isRequired,
  hasAutoPayAccount: PropTypes.bool,
  hasAutoPayEnrollDetails: PropTypes.bool,
  hasPaymentProfile: PropTypes.bool,
  isTesting: PropTypes.bool,
  actionOrigin: PropTypes.string,
};

AutoPayContextProvider.defaultProps = {
  hasAutoPayAccount: false,
  hasAutoPayEnrollDetails: false,
  hasPaymentProfile: false,
  isTesting: false,
  actionOrigin: undefined,
};
