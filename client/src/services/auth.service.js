// src/services/auth.servce.js

import axios from "axios";

const API_URL = "http://localhost:8181/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register/", {
    'username': username,
    'email': email,
    'password': password,
    profile: {
      'username': username,
      public: true,
      affiliation: "",
      orcid: ""
    }
  });
};

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "token/", {
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
  const response = await axios.post(API_URL + 'oauth/', {
    id_token: idToken
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const account = async (data) => {
  console.log('account axios', `JWT ${JSON.parse(localStorage.getItem('token'))}`)
  const response = await axios
    .post(API_URL + "update_user/", {
      'username': data.username,
      'first_name': data.first_name,
      'last_name': data.last_name,
      'email': data.email,
      'affiliation': data.affiliation,
      'orcid': data.orcid,
      'public': data.public,
    }, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'application/json'
      }
    });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

const changePassword = (data) => {
  return axios.put(API_URL + 'change_password/', {
    old_password: data.old_password,
    new_password: data.new_password,
  }, {
    headers: {
      'Authorization': `JWT ${JSON.parse(localStorage.getItem('token'))}`,
      'Content-Type': 'application/json'
    }
  })
};

const authenticateBcoDb = async (token, hostname) => {
  const response = await axios.post(`${hostname}/api/accounts/describe/`, {},{
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

const addBcoDb = async (data) => {
  console.log(data);
  const response = await axios.post(`${API_URL}bcodb/add/`, {
    data
  }, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      'Content-Type': 'application/json'
    }
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response
};

const authService = {
  register,
  login,
  logout,
  account,
  changePassword,
  googleLogin,
  authenticateBcoDb,
  addBcoDb,
};

export default authService;