// services/bco.Service.js

import { setMessage } from "../slices/messageSlice";
import axios from "axios";

const addExtension = async (newSchema) => {
  console.log(newSchema)
  const response = await axios.get(newSchema);
  return newSchema
}

const BcoService = {
  addExtension,
};

export default BcoService;