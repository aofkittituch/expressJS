<template>
  <div class="container mt-5">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="loginUser">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          v-model="user.username"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      const login = {
        username: this.user.username,
        password: this.user.password,
      };
      const res = [];
      try {
        const result = await axios.post(
          "http://localhost:3000/api/login",
          login
        );
        const res = result.data;
        console.log(res);
        if (res.status === true) {
          this.$swal({
            title: "Login Success!",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "Okay",
          }).then(async () => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.payload.user.username);
            await router.push("/admin/list");
            await router.go(0);
          });
        } else {
          this.$swal({
            title: res.message,
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      } catch (err) {
        console.log(err);
        this.$swal({
          title: err.response.data.message,
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    },
  },
};
</script>

<style></style>
