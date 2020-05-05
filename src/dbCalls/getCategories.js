import axios from "axios";
import { apiUrl } from "../constants/constants";

const getCategories = async type => {
  const storeDetails = await axios.get(`${apiUrl}/getCategories/${type}`);
  return storeDetails;
};

export default getCategories;
