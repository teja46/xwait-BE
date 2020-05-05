import axios from "axios";
import { apiUrl } from "../constants/constants";

const getStoreReview = async storeId => {
  const storeReview = await axios.get(`${apiUrl}/getFeedbackData/${storeId}`);
  return storeReview;
};

export default getStoreReview;
