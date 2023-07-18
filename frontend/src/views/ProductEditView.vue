<template>
  <div class="container" id="app">
    <form>
      <div><h2>Edit Product</h2></div>
      <br />
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="item.name" />
      </div>
      <br />
      <div class="form-group">
        <label for="detail">Detail</label>
        <input
          type="text"
          class="form-control"
          id="detail"
          v-model="item.detail"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="text"
          class="form-control"
          id="price"
          v-model="item.price"
        />
      </div>
      <br />
      <button type="submit" class="btn btn-primary" @click.prevent="check()">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import Swal from "sweetalert2/dist/sweetalert2";

const route = useRoute();

const item = ref({
  name: "",
  detail: "",
  price: "",
});

const fetchData = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/product/${route.params.id}`
    );
    item.value = res.data;
    console.log(item.value);
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  if (localStorage.getItem("token")) {
    fetchData();
  } else {
    router.push("/admin/login");
  }
});

const UpdateData = async () => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/product/${route.params.id}`,
      {
        "name": item.value.name,
        "detail": item.value.detail,
        "price": item.value.price,
      },
      {
        headers: {
          "authtoken": `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

const check = async () => {
  if (
    item.value.name == "" ||
    item.value.detail == "" ||
    item.value.price == ""
  ) {
    await Swal.fire({
      icon: "warning",
      title: "Fields cannot be empty",
    });
    return;
  } else {
    await Swal.fire({
      icon: "success",
      title: "Update successfully",
    });
    await UpdateData();
    await router.push("/admin/list");
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40vh;
}
</style>
