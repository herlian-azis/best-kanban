<template>
  <div>

    <Register v-if="isRegister && !isLogin" @back="back" @Register="Login"></Register>

    <Login
      v-else-if="!isLogin && !isRegister"
      @ShowRegister="ShowRegister"
      @Login="Login"
    ></Login>
    <Navbar v-if="isLogin" @Logout="Logout"></Navbar>

    <ContainerCard v-if="isLogin"></ContainerCard>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import ContainerCard from "./components/ContainerCard";
import Login from "./components/Login";
import Register from "./components/Register";
import Card from "./components/Card";
const myUrl = "https://tranquil-dusk-11569.herokuapp.com";

export default {
  name: "punyaAPP",
  data() {
    return {
      message: "Hello world",
      isLogin: false,
      isRegister: false
    };
  },
  components: {
    Navbar,
    ContainerCard,
    Login,
    Register
  },
  methods: {
    ShowRegister() {
      this.isRegister = true;
    },
    Logout() {
      console.log('loggggggut');
      this.isLogin = false;
      this.isRegister = false;
      // console.log(this.isLogin,this.isRegister);
    },
    Login() {
      this.isLogin = true;
    },
    back() {
      this.isRegister = false;
    },
  },
    created() {
      if (localStorage.token) {
        this.Login();
      } else {
        this.Logout();
      }
    }
};
</script>

<style scoped>
</style>