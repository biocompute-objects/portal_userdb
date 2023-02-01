// src/services/auth.servce.js

import axios from "axios";

const USERS_URL = process.env.REACT_APP_USERDB_URL;

const register = (username, email, password) => {
  return axios.post(USERS_URL + "register/", {
    "username": username,
    "email": email,
    "password": password,
    profile: {
      "username": username,
      public: true,
      affiliation: "",
      orcid: ""
    }
  });
};

const login = async (username, password) => {
  const response = await axios.post(USERS_URL + "token/", {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const googleLogin = async (idToken) => {
  const response = await axios.post(USERS_URL + "google/", {
    id_token: idToken
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const googleRegister = async (data) => {
  const response = await axios.post(USERS_URL + "google/register", {
    data
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  global.window.location.reload();
};

const account = async (data) => {
  const response = await axios
    .post(USERS_URL + "update_user/", {
      "username": data.username,
      "first_name": data.first_name,
      "last_name": data.last_name,
      "email": data.email,
      "affiliation": data.affiliation,
      "orcid": data.orcid,
      "public": data.public,
    }, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json"
      }
    });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

const changePassword = (data) => {
  return axios.put(USERS_URL + "change_password/", {
    old_password: data.old_password,
    new_password: data.new_password,
  }, {
    headers: {
      "Authorization": `JWT ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  })
};

const userInfo = async () => {
  console.log("auth.slice", `Bearer ${JSON.parse(localStorage.getItem("token"))}`)
  const response = await axios.post(USERS_URL + "user_info/", {}, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
};
const authService = {
  register,
  login,
  logout,
  account,
  changePassword,
  googleLogin,
  googleRegister,
  userInfo,

};

export default authService;