// services/bco.service.js

import axios from "axios";

const addExtension = async (newSchema) => {
  console.log(newSchema)
  const response = await axios.get(newSchema);
  return response
}

const getDraftBco = async (object_id) => {
  const response = await axios.get(object_id, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}

const getPubBco = async (object_id) => {
  console.log(object_id)
  const response = await axios.get(object_id, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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

const updateDraftBco = async (bcoURL, bcoObject) => {
  const response = await axios.post(`${bcoURL}objects/drafts/modify/`, {
    "POST_api_objects_drafts_modify": [
      {
        "object_id": bcoObject["object_id"],
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

const publishDraftBco = async (prefix, bcoURL, bcoObject) => {
  console.log(bcoObject["object_id"], prefix)
  const response = await axios.post(`${bcoURL}objects/drafts/publish/`, {
    "POST_api_objects_drafts_publish": [
      {
        "prefix": prefix,
        "draft_id": bcoObject["object_id"]
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

const validateBco = async (bcoURL, bcoObject) => {
  const response = await axios.post(`${bcoURL}objects/validate/`, {
    "POST_validate_bco": [bcoObject]
  }, {
    headers: {
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
  updateDraftBco,
  publishDraftBco,
  validateBco,
};

export default BcoService;