<template>
  <div class="container">
    <h1>Product Lists</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Detail</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(items, index) in products">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ items.name }}</td>
          <td>{{ items.detail }}</td>
          <td>{{ items.price }}</td>
          <td v-if="items.file">
            <img :src="filePath + items.file" class="img-fluid" width="50"/>
          </td>
          <td v-else><img src="https://www.tairos.tw/images/default.jpg" class="img-fluid" width="50"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "List",
  data() {
    return {
      products: [],
      filePath: "http://localhost:3000/uploads/",
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        headers: {
          "authtoken": `${localStorage.getItem("token")}`,
        },
      });
      this.products = response.data;
      console.log(this.products);
    } catch (err) {
      console.log(err.message);
      router.push("/login");
    }
  },
};
</script>

<style></style>
