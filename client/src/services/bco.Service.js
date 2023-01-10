// services/bco.service.js

import axios from "axios";

const addExtension = async (newSchema) => {
  console.log(newSchema)
  const response = await axios.get(newSchema);
  return response
}

const bcoService = {
  addExtension,
};

export default bcoService;