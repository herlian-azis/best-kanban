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
          <button
            @click.prevent="exitEdit"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="dataEdit">
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

            <select class="form-control" v-model="newCategory">
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <br />
            <button
              @click.prevent="exitEdit"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "newEdit"],

  data() {
    return {
      title: "",
      description: "",
      newCategory: ""
    };
  },

  methods: {
    dataEdit() {
      console.log(this.newEdit.id,'cekkkkdassdas')
      this.$emit("dataEdit", {
        id: this.newEdit.id,
        title: this.title,
        category: this.newCategory,
        description: this.description
      });
    },
    exitEdit() {
      this.$emit("exitEdit");
    }
  },
  created() {
    this.title = this.newEdit.title;
    this.description = this.newEdit.description;
    this.newCategory = this.newEdit.category;
  }
};
</script>

<style>
</style>