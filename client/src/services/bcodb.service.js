// services/bcodb.service.js

import axios from "axios";

const searchBcodbAPI = async (data) => {
  const response = await axios.post(data.public_hostname + "/api/objects/search/", {
    POST_api_objects_search: [
      {
        type: data.action,
        search: data.search
      }
    ]
  },{
    headers: {
      "Authorization": `Token ${data.token}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}


const authenticateBcoDb = async (token, hostname) => {
  const response = await axios.post(`${hostname}/api/accounts/describe/`, {},{
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

const addBcoDb = async (data) => {
  console.log(data);
  const response = await axios.post(`${USERS_URL}bcodb/add/`, {
    data
  }, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    global.window.location.reload();
  }
  return response
};

const removeBcoDb = async (database) => {
  console.log("Service", database)
  const response = await axios.post(`${USERS_URL}bcodb/remove/`, {
    database
  },{
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

const bcodbService = {
  searchBcodbAPI,
  authenticateBcoDb,
  addBcoDb,
  removeBcoDb,
};

export default bcodbService;
