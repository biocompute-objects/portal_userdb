import axios from "axios";

const USERS_URL = process.env.REACT_APP_USERDB_URL;
const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;

const searchPrefix = async (data) => {
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
  const response = await axios.post(`${bcodb}/api/prefixes/token/`, {
  }, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}


const prefixService = {
  searchPrefix,
  registerPrefix,
  prefixList,
};

export default prefixService;