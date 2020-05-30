import axios from "axios";
import { apiUrl } from "../constants/constants";

const getServices = async (storeCode) => {
  const serviceDetails = await axios.get(
    `${apiUrl}/getServiceTypesStore/${storeCode}`
  );
  return serviceDetails;
};

export default getServices;
