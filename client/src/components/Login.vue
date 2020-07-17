<template>
  <!-- <h1>Hallo ini Login Page</h1> -->
  <div class="d-flex justify-content-center">
    <form @submit.prevent="proccessLogin">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="text" class="form-control" v-model="loginEmail" aria-describedby="emailHelp" />
        <h1>{{cobalogin}}</h1>
        <small id="emailHelp" class="form-text text-muted">
          We'll
          never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="loginPassword" />
      </div>
      <p>
        if you haven't have an account, please
        <a href="#" @click.prevent="showRegister()">Register</a>
      </p>
      <button type="submit" class="btn btn-primary">Login</button>
      <p>
        Or Register with
        <a
          href="#"
          class="btn btn-primary btn-sm active"
          role="button"
          aria-pressed="true"
          @click.prevent="withGoogle"
        >Google</a>
      </p>
    </form>
  </div>
</template>


<script>
import axios from "axios";
export default {
  props: ["cobalogin"],
  data() {
    return {
      loginEmail: "",
      loginPassword: ""
    };
  },
  methods: {
    withGoogle(){
                this.$gAuth.signIn()
                .then(responese => {
                    let dataGoogle = responese.getAuthResponse()
                    this.googleLogin(dataGoogle.id_token)

                })
                .catch(err => {

                })
                this.isSignIn = this.$gAuth.isAuthorized
            },
            googleLogin(idToken){
                axios({
                        method: "post",
                        url: "https://tranquil-dusk-11569.herokuapp.com/google",
                        headers: {
                            idToken: idToken
                        }
                    })
                    .then(result => {
                        console.log( result,'dari result')
                        localStorage.setItem("token", result.data.token)
                        this.$emit("Login")
                    })
                    .catch(err => {
                        console.log( err)
                    })
            },
    
    showRegister() {
      this.$emit("ShowRegister");
    },
    proccessLogin() {
      console.log(this.loginEmail)
      axios({
        method: "POST",
        url: "https://tranquil-dusk-11569.herokuapp.com/login",
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
        .then(result => {
          // console.log(result);
          this.SetDataAccount(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    SetDataAccount(result) {
      localStorage.setItem("token", result.data.token);
      this.$emit("Login");
    }
  },
  created() {}
};
</script>