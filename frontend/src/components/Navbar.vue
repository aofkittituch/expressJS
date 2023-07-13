<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"
        ><img
          src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png"
          alt="Logo"
          width="50"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="token">
          <li class="nav-item">
            <a class="nav-link"><b>ยินดีต้อนรับคุณ, {{ username }}</b></a>
          </li>
          <li class="nav-item mb-2 mr-2">
            <button class="btn btn-danger" @click="logout">Logout</button>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="token == null">
          <li class="nav-item mb-2 mr-2">
            <router-link to="/admin/login"
              ><button class="btn btn-primary">Login</button></router-link
            >
          </li>
          <li class="nav-item mb-2 mr-2">
            <router-link to="/admin/register"
              ><button class="btn btn-primary">Register</button></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../router";

export default {
  name: "Navbar",
  data() {
    return {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.token = "";
      this.username = "";
      router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
.mr-2 {
  margin-right: 0.5rem;
}
</style>
