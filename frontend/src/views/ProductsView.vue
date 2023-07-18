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
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(items, index) in products">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ items.name }}</td>
          <td>{{ items.detail }}</td>
          <td>{{ items.price }}</td>
          <td v-if="items.file">
            <img :src="filePath + items.file" class="img-fluid" width="50" />
          </td>
          <td v-else>
            <img
              src="https://www.tairos.tw/images/default.jpg"
              class="img-fluid"
              width="50"
            />
          </td>
          <td>
            <router-link :to="'product/' + items._id"
              ><button class="btn btn-primary" style="margin-right: 5px">
                <font-awesome-icon icon="edit" class="text-white" /></button
            ></router-link>
            <button class="btn btn-danger" @click="deleteProduct(items._id)">
              <font-awesome-icon icon="trash" class="text-white" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2/dist/sweetalert2";

export default {
  name: "List",
  data() {
    return {
      products: [],
      filePath: "http://localhost:3000/uploads/",
    };
  },
  methods: {
    async deleteProduct(id) {
      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Swal.fire("Deleted!", "Your file has been deleted.", "success");
          await axios.delete("http://localhost:3000/api/product/" + id, {
            headers: {
              "authtoken": `${localStorage.getItem("token")}`,
            },
          });
          router.go(0);
        }
      });
    },
  },
  async mounted() {
    try {
      if (!localStorage.getItem("token")) {
        router.push("/admin/login");
      }
      const response = await axios.get("http://localhost:3000/api/product", {
        headers: {
          "authtoken": `${localStorage.getItem("token")}`,
        },
      });
      this.products = response.data;
      console.log(this.products);
    } catch (err) {
      console.log(err.message);
      router.push("/admin/login");
    }
  },
};
</script>

<style></style>
