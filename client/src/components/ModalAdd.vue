<template>
  <div
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    :id="`${category}exampleModal`"
    style="padding-right: 16px; display: block"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button @click.prevent="exitModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addTask">
            <div class="form-group">
              <label for="teks">title</label>
              <input
                type="title"
                class="form-control"
                id="title"
                aria-describedby="emailHelp"
                placeholder="Enter desc"
                v-model="title"
              />
              <small id class="form-text text-muted">input your title</small>

              <label for="teks">desc</label>
              <input
                type="desc"
                class="form-control"
                id="desc"
                aria-describedby="emailHelp"
                placeholder="Enter desc"
                v-model="description"
              />
              <small id class="form-text text-muted">name</small>
            </div>
            
            <button type="submit" class="btn btn-primary">Save changes</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click.prevent="exitModal"
            >Close</button>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],

  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    addTask() {
      console.log("cekkkkk", this);
      this.$emit("add", {
        title: this.title,
        description: this.description,
        category: this.category
      }),
        (this.title = ""),
        (this.description = "");
    },
    cek() {
      console.log("object");
    },
    exitModal() {
      console.log("object");
      this.$emit("exit");
    }
  },

  created() {
    console.log(this.title);
    console.log("ddddddddddddddd", this.category);
  }
};
</script>

<style>
</style>