import axios from "axios";
import { apiUrl } from "../constants/constants";

const confirmSlot = async slotDetails => {
  const bookedSlot = await axios.post(`${apiUrl}/bookSlot`, slotDetails);
  return bookedSlot;
};

export default confirmSlot;
