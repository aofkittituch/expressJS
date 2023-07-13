<template>
  <div class="container mt-5">
    <div class="text-center mb-5">
      <h2>Products ({{ products.length }})</h2>
    </div>
    <div class="row">
      <div class="col-sm-3" v-for="item in products" :key="item._id">
        <div class="card" style="width: 18rem">
          <router-link :to="'product/detail/' + item._id">
            <img
              class="card-img-top"
              :src="filePath + item.file"
              alt="Card image cap"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ item.name }} ({{ item.price }}$)</h5>
            <p class="card-text">
              {{ item.detail }}
            </p>
            <router-link :to="'product/detail/' + item._id">
              <button class="btn btn-success">View Detail</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      products: [],
      filePath: "http://localhost:3000/uploads/",
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/product");
      this.products = response.data;
      console.log(this.products);
    } catch (err) {
      console.log(err.message);
    }
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.row > div[class*="col-"] {
  display: flex;
}
</style>
