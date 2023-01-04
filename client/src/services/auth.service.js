import axios from "axios";

const API_URL = "http://localhost:8181/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "list/", {
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

const login = (username, password) => {
  return axios
    .post(API_URL + "token/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const googleLogin = (idToken) => {
  return axios.post(API_URL + 'oauth/', {
    id_token: idToken
  })
  .then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const account = (data) => {
  return axios
    .post(API_URL + "update_user/", {
      'first_name': data.first_name,
      'last_name': data.last_name,
      'email': data.email,
      'groups': data.groups,
      'password': data.password,
      'username': data.username,
      'affiliation': data.profile.affiliation,
      'orcid': data.profile.orcid,
      'public': data.profile.public,
    }, {
      headers: {
        'Authorization': `JWT ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    });
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

const authService = {
  register,
  login,
  logout,
  account,
  changePassword,
  googleLogin,
};

export default authService;