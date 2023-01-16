import axios from "axios";

const USERS_URL = process.env.REACT_APP_USERDB_URL;

const searchPrefix = async (data) => {
  console.log("Service", data);
  const search = data.search
  const type = data.radio
  const response = await axios.get(`${USERS_URL}prefix/search/?name=${search}&type=${type}`, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response
};

const prefixService = {
  searchPrefix,
};

export default prefixService;