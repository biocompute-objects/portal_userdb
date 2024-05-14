// services/bco.service.js

import axios from "axios";

const USERS_URL = process.env.REACT_APP_USERDB_URL;

const getExtension = async (schemaUrl) => {
  const secureUrl = schemaUrl.replace("http://", "https://")
  const response = await axios.get(secureUrl);
  return response.data
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

const getTempDraftBco = async (queryString) => {
  const response = await axios.post(`${USERS_URL}bcodb/draft_bco/get`, {
    "bco_id": queryString
  }, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

const deleteTempDraftBco = async (queryString) => {
  const response = await axios.post(`${USERS_URL}bcodb/draft_bco/delete`, {
    "bco_id": queryString
  }, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

const getPubBco = async (object_id) => {
  const response = await axios.get(object_id, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}

const createDraftBco = async (bcoURL, bcoObject, prefix, owner_group) => {
  const response = await axios.post(`${bcoURL}objects/drafts/create/`, {
    "POST_api_objects_draft_create": [
      {
        "prefix": prefix,
        "owner_group": owner_group,
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
  return response.data;
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
  const response = await axios.post(`${bcoURL}objects/validate/`, [bcoObject], {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response;
}

const modifyGroup = async ({bcodb, request}) => {
  const response = await axios.post(`${bcodb.public_hostname}/api/groups/modify/`, {
    "POST_api_groups_modify": [request]
  },{
    headers: {
      "Authorization": `Token ${bcodb.token}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}

const BcoService = {
  getExtension,
  getDraftBco,
  getTempDraftBco,
  deleteTempDraftBco,
  getPubBco,
  createDraftBco,
  updateDraftBco,
  publishDraftBco,
  validateBco,
  modifyGroup,
};

export default BcoService;
