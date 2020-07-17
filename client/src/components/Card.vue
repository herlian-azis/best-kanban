<template>
  <div class="d-flex flex-column bd-highlight mb-3">
    <div class="p-2 bd-highlight">
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">{{task.title}}</h5>
          <p class="card-text">{{task.description}}</p>
          <p class="card-text">{{task.User.email}}</p>
          <a class="btn btn-primary" @click.prevent="deleteTask">Delete</a>

          <a class="btn btn-info" @click.prevent="buttonEdit(task)">Edit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const myUrl = "http://localhost:3000";
import axios from "axios";
export default {
  props: ["task"],
  methods: {
    deleteTask() {
      axios({
        method: "delete",
        url: myUrl + "/tasks/" + this.task.id,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          // console.log(result);
          this.$emit(`getTask`);
        })
        .catch(err => {
          console.log(err);
        });
    },
  buttonEdit(task) {
    console.log("object dari Card");
    this.$emit("editTask",task);
  }
  },
};
</script>

<style>
</style>