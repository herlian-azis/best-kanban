<template>
  <!-- <h1>Hallo ini Register Page</h1> -->
  <div class="d-flex justify-content-center">
    <form @submit.prevent="proccessRegister">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="emailRegister"
          aria-describedby="emailHelp"
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll
          never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="passwordRegister" />
      </div>
      <button type="button" class="btn btn-primary" @click="balikkeLogin">Back</button>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>


<script>
import Axios from "axios";

export default {
  data() {
    return {
      emailRegister: "",
      passwordRegister: ""
    };
  },
  methods: {
    balikkeLogin() {
      this.$emit("back");
    },
    proccessRegister() {
      Axios({
        method: "post",
        url: "https://tranquil-dusk-11569.herokuapp.com/register",
        data: {
          email: this.emailRegister,
          password: this.passwordRegister
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          console.log(result,'dari rregister');
          this.$emit("Register");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
