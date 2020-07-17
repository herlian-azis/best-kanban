<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <a class="navbar-brand" href="#">Kanban-Beta</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <button class="btn btn-outline-danger my-2 my-sm-0" id="logout" @click="proccesLogout()">Logout</button>
      </div>
        </div>
</template>

<script>
export default {
methods: {
    proccesLogout() {
      localStorage.clear();
      this.$gAuth.signOut();
      this.$emit("Logout");
    }
}
}
</script>

<style>

</style>