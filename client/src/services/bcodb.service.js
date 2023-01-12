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


const bcodbService = {
  searchBcodbAPI,
};

export default bcodbService;
