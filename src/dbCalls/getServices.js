import axios from "axios";
import { apiUrl } from "../constants/constants";

const getServices = async storeId => {
  const serviceDetails = await axios.get(
    `${apiUrl}/getServiceTypes/${storeId}`
  );
  return serviceDetails;
};

export default getServices;
