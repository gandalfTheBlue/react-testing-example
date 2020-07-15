import axios from "axios";

const buildHeaderParams = (authContext) => {
  return {
    Authorization: `Bearer ${authContext.token}`,
    partyId: `${authContext.partyId}`,
    country: `${authContext.country}`,
    brand: `${authContext.brand}`,
    ExternalId: "vci-dashboard-app",
    "Accept-Language": "en-US",
  };
};

export const fetchVehicleDetailData = async (authContext, vin) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_VEHICLE_DETAILS_API_URL}/vin.${vin}.json`,
      {
        params: {},
        headers: buildHeaderParams(authContext),
      }
    );
    if (response && response.data) {
      console.log("Received Data for VIN======>", response.data);
      return response.data;
    }
    return {};
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default fetchVehicleDetailData;
