// src/services/auth.servce.js

import axios from "axios";

const USERS_URL = process.env.REACT_APP_USERDB_URL;
const BCODB_URL = process.env.REACT_APP_BCOAPI_URL;

const register = (username, email, password) => {
  return axios.post(USERS_URL + "auth/register/", {
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
  const response = await axios.post(USERS_URL + "auth/login/", {
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
  const response = await axios.post(USERS_URL + "google/login/", {
    id_token: idToken
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const googleRegister = async (data) => {
  const response = await axios.post(USERS_URL + "google/register/", {
    data
  });
  return response;
};

const orcidLogIn = async (code) => {
  const response = await axios.get(`${USERS_URL}orcid/login/?code=${code}`)
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
}

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
  return axios.post(USERS_URL + "change_password/", {
    old_password: data.old_password,
    new_password: data.new_password,
  }, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  })
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${USERS_URL}password_reset/`, {
    email
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response
};

const resetPassword = async ({newPassword, token}) => {
  console.log(newPassword, token)
  const response = await axios.post(`${USERS_URL}password_reset/confirm/`, {
    "password": newPassword,
    "token": token
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response
};

const userInfo = async () => {
  const response = await axios.post(USERS_URL + "user_info/", {}, {
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

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

const registerBcoDb = async (email, token) => {
  console.log(email, token, BCODB_URL);
  const response = await axios.post(`${BCODB_URL}auth/register/`, {
    "hostname": `${USERS_URL}`,
    "email": email,
    "token": token
  });
  return response
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

const groupInfo = async (group_permissions, token, public_hostname) => {
  console.log("Service", group_permissions, token, public_hostname)
  const response = await axios.post(`${public_hostname}/api/groups/group_info/`, {
    POST_api_groups_info: {
      names: group_permissions
    }
  }, {
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json"
    }
  })
  return response;
}

const authService = {
  register,
  login,
  logout,
  account,
  changePassword,
  forgotPassword,
  resetPassword,
  googleLogin,
  googleRegister,
  userInfo,
  orcidLogIn,
  searchBcodbAPI,
  authenticateBcoDb,
  registerBcoDb,
  addBcoDb,
  removeBcoDb,
  groupInfo,
};

export default authService;