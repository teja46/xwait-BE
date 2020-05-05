import axios from "axios";
import { apiUrl } from "../constants/constants";

const getStores = async () => {
  const storeDetails = await axios.get(`${apiUrl}/getStores`);
  return storeDetails;
};

export default getStores;
