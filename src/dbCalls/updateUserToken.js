import axios from "axios";
import { apiUrl } from "../constants/constants";

const updateUserToken = async (userId, token) => {
  const userObj = {
    userId,
    token
  };
  const userToken = await axios.post(`${apiUrl}/updateUserToken`, userObj);
  return userToken;
};

export default updateUserToken;
