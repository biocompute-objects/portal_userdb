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

const BcoService = {
  addExtension,
  getDraftBco,
  getPubBco,
};

export default BcoService;