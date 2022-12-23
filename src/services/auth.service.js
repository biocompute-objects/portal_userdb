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
    .post(API_URL + "token-auth/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;