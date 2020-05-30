import axios from "axios";
import { apiUrl } from "../constants/constants";

const phoneSingup = async (userObj) => {
  console.log(userObj);
  const userDetails = await axios.post(`${apiUrl}/signUpMobileUser`, userObj);
  return userDetails;
};

export default phoneSingup;
