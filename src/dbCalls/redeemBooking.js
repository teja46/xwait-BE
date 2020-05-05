import axios from "axios";
import { apiUrl } from "../constants/constants";

const redeemBooking = async bookingId => {
  const bookingRedeemed = await axios.get(
    `${apiUrl}/redeemBooking/${bookingId}`
  );
  return bookingRedeemed;
};

export default redeemBooking;
