import axios from "axios";
import { apiUrl } from "../constants/constants";

const submitFeedback = async feedbackObj => {
  const feedback = await axios.post(`${apiUrl}/submitFeedback`, feedbackObj);
  return feedback;
};

export default submitFeedback;
