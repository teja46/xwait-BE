import axios from "axios";
import { apiUrl } from "../constants/constants";

const getBookedSlots = async (userId, slotType) => {
  const slotDetails = await axios.get(
    `${apiUrl}/bookedSlots/${userId}/${slotType}`
  );
  return slotDetails;
};

export default getBookedSlots;
