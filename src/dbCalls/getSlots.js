import axios from "axios";
import { apiUrl } from "../constants/constants";

const getSlots = async (storeId, date, serviceId) => {
  const slotDetails = await axios.get(
    `${apiUrl}/slots/${storeId}/${date}/${serviceId}`
  );
  return slotDetails;
};

export default getSlots;
