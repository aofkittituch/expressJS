<template>
  <div class="container mt-5">
    <div class="card" style="width: 18rem">
      <img
        class="card-img-top"
        :src="filePath + product.file"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.detail }}</p>
        <p class="card-text">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const filePath = "http://localhost:3000/uploads/";

const product = ref({});

const fetchData = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/product/${route.params.id}`
    );
    product.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style></style>
