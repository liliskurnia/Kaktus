import axios from 'axios';

const API_URL = `http://localhost:8000/api/v1/menus/`;

class UserService {
  fetchAll = () => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data;
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchOne = (id) => {
    axios
      .get(API_URL + id)
      .then((res) => {
        const data = res.data;
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  create = (data) => {
    axios
      .post(API_URL, data)
      .then((res) => {
        if (res.status === 200) {
          console.log('data successfully created');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  update = (id, data) => {
    axios
      .put(API_URL + id, data)
      .then((res) => {
        if (res.status === 200) {
          console.log('user data has been updated');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  delete = (id) => {
    axios
      .delete(API_URL + id)
      .then((res) => {
        if (res.status === 200) {
          console.log('user has been successfully deleted');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default new UserService();
