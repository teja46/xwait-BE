import axios from "axios";
import { apiUrl } from "../constants/constants";

const sendContactDetails = async contactObj => {
  const contacDetails = await axios.post(`${apiUrl}/contacDetails`, contactObj);
  return contacDetails;
};

export default sendContactDetails;
