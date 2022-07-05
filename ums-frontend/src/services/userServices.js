import axios from "axios";

const USER_API_GET_URL = "http://localhost:7000/api/user";
const USER_API_POST_URL = "http://localhost:7000/api/user/addUser";
const USER_API_PUT_URL = "http://localhost:7000/api/user/update";
const USER_API_DELETE_URL = "http://localhost:7000/api/user/delete";

class userServices {
  getUsers() {
    return axios.get(USER_API_GET_URL);
  }

  createUser(user) {
    return axios.post(USER_API_POST_URL, user);
  }

  getUserById(userId) {
    return axios.get(USER_API_GET_URL + "/" + userId);
  }

  updateUser(user, userId) {
    return axios.put(USER_API_PUT_URL + "/" + userId, user);
  }

  deleteUser(userId) {
    return axios.delete(USER_API_DELETE_URL + "/" + userId);
  }
}

export default new userServices();
