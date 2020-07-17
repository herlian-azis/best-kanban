<template>
  <div class="container-fluid">
    <div class="row">
    
    
    
      <Category  @getTask='getTask' v-for="(category, index) in categories" :key="index" :containerToCategory="category" :containerToCard="tasks"></Category>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Category from "./Category";
export default {
  data() {
    return {
      tasks: [],
      categories: [
        {
          name: "Backlog",
          color: "bg-danger"
        },
        {
          name: "Todo",
          color: "bg-warning"
        },
        {
          name: "Doing",
          color: "bg-primary"
        },
        {
          name: "Done",
          color: "bg-success"
        }
      ]
    };
  },
  components: {
    Category
  },
  methods: {
    getTask() {
      axios({
        method: "get",
        url: "http://localhost:3000/tasks",
        headers: {
          token: localStorage.token
        }
      })
        .then(respon => {
          // console.log(respon.data[0].User)
          this.tasks = respon.data;
          // console.log(this.tasks);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTask();
  }
};
</script>

<style>
</style>