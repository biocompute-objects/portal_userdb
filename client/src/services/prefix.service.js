import axios from "axios";

const USERS_URL = process.env.REACT_APP_USERDB_URL;
const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;

const searchPrefixRegistry = async (data) => {
  const response = await axios.get(`${USERS_URL}prefix/search/?name=${data[1]}&type=${data[0]}`, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response
};

const registerPrefix = async (values) => {
  const response = await axios.post(`${USERS_URL}prefix/register/`, {
    prefix: values.prefix,
    public: values.public,
    description: values.description,
    bcodb: BCODB_URL
  }, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response
}

const prefixList = async (bcodb) => {
  const response = await axios.post(`${bcodb}/api/prefixes/user/`, {
  }, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  })
  return response;
};

const prefixInfo = async (bcodb, prefixName) => {
  const response = await axios.post("http://localhost:8000/api/prefixes/info/", [
    prefixName
  ], {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  })
  return response
}

const prefixService = {
  searchPrefixRegistry,
  registerPrefix,
  prefixList,
  prefixInfo,
};

export default prefixService;