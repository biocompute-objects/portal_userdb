// services/bco.service.js

import axios from "axios";

const addExtension = async (newSchema) => {
  console.log(newSchema)
  const response = await axios.get(newSchema);
  return response
}

const getDraftBco = async (objectInfo, object_id) => {
  const response = await axios.get(object_id, {
    headers: {
      "Authorization": `Token ${objectInfo[0]}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}

const getPubBco = async (objectInfo, object_id) => {
  const response = await axios.get(object_id, {
    headers: {
      "Authorization": `Token ${objectInfo[0]}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}

const createDraftBco = async (bcoURL, bcoObject) => {
  const response = await axios.post(`${bcoURL}objects/drafts/create/`, {
    "POST_api_objects_draft_create": [
      {
        "prefix": "BCO",
        "owner_group": "bco_drafter",
        "schema": "IEEE",
        "contents": 
          bcoObject
      }
    ]
  }, {
    headers: {
      "Authorization": `Token ${JSON.parse(localStorage.getItem("user"))["bcodbs"][0]["token"]}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

const BcoService = {
  addExtension,
  getDraftBco,
  getPubBco,
  createDraftBco,
};

export default BcoService;