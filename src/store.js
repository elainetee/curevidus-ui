import { reactive } from 'vue'
import { Cookies } from "quasar";
import axios from 'axios';

export const store = reactive({
  user: [],
  async getUsername() {
    try {
      //  Axios.defaults.headers.common['Authorization'] = 'Bearer' + Cookies.get('token')
      const res = await axios.get(`http://127.0.0.1:8000/api/user`, {
        headers: { Authorization: "Bearer" + Cookies.get("token") },
        contentType: "text/plain",
      });
      this.user = res.data;
      if (this.user.avatar) {
        this.user.avatar = `http://127.0.0.1:8000` + this.user.avatar;
      }
    } catch (error) {
      console.log(error);
    }
  },
})