import axios from "axios";
import fetchVehicleDetailData from "./fetchVehicleDetailData";

jest.mock("axios");

const authContext = {
  token: "token",
  partyId: 4,
  country: "USA",
  brand: "audi",
};

describe("test fetchVehicleDetailData function", () => {
  test("test vehicle deatail data is correctly fetched", async () => {
    const mockData = {
      data: {
        objectID: "1",
        title: "a",
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    const result = await fetchVehicleDetailData(authContext, "vin");
    expect(result).toEqual(mockData.data);
  });

  test("test empty vehicle deatail data is fetched", async () => {
    const mockData = {};
    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    const result = await fetchVehicleDetailData(authContext, "vin");
    expect(result).toEqual({});
  });

  test("fetches erroneously vehicle detail data", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(fetchVehicleDetailData(authContext, "vin")).rejects.toThrow(
      errorMessage
    );
  });
});
