<template>
  <div class="container mt-5">
    <div class="text-center mt-5"><h1>Register</h1></div>

    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="regis.username"
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
        v-model="regis.password"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword2" class="form-label"
        >Confirm Password</label
      >
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword2"
        v-model="regis.confirm_password"
      />
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click.prevent="CheckPassword()"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2/dist/sweetalert2";

const regis = ref({
  username: "",
  password: "",
  confirm_password: "",
});

const registerData = async () => {
  try {
    await axios.post("http://localhost:3000/api/register", {
      "username": regis.value.username,
      "password": regis.value.password,
    });
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "warning",
      title: e.response.data.message,
    });
  }
};

const CheckPassword = async () => {
  try {
    if (regis.value.username == "") {
      await Swal.fire("Username can't be empty", "", "warning");
      return;
    } else if (
      regis.value.password == "" ||
      regis.value.confirm_password == ""
    ) {
      await Swal.fire("Password can't be empty", "", "warning");
    } else {
      if (
        regis.value.password == regis.value.confirm_password &&
        regis.value.username !== ""
      ) {
        const data = registerData();
        if (data) {
          await Swal.fire("Register Successfully", "", "success").then(() => {
            router.push("/admin/login");
          });
        }
        console.log(regis.value);
      } else {
        await Swal.fire("Password dose not match", "", "error");
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
</script>

<style></style>
