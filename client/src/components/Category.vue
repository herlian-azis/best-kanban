<template>
  <div class="col">
    <div :class="`${containerToCategory.color} rounded-lg `">
      <div class="bg-dark rounded-top py-2">
        <center>
          <h2 class="text-white">{{containerToCategory.name}}</h2>
        </center>
      </div>

      <div class="overflow-auto" style="max-width: auto; max-height: 500px;">
        <Card
          v-for="(task, index) in filterTask"
          :key="index"
          :task="task"
          @getTask="getTask"
          @editTask="buttonEdit"
        ></Card>
      </div>
      <center>
        <button class="btn btn-outline-dark" type="submit " @click="showModal=true">Add Task</button>
      </center>
      <br />
    </div>

    <ModalAdd
      @exit="exitModal"
      v-if="showModal"
      @add="addNew"
      :category="containerToCategory.name.toLowerCase()"
    ></ModalAdd>
    <ModalEdit @dataEdit="editTask" v-if="showEdit" @exitEdit="exitEdit" :newEdit="newEdit"></ModalEdit>
  </div>
</template>

<script>
import Card from "./Card";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import axios from "axios";

const myUrl = "https://tranquil-dusk-11569.herokuapp.com";
export default {
  data() {
    return {
      showModal: false,
      showEdit: false,
      newEdit: null
    };
  },
  props: ["containerToCategory", "containerToCard"],
  components: {
    Card,
    ModalAdd,
    ModalEdit
  },
  computed: {
    filterTask() {
      const result = this.containerToCard.filter(task => {
        return (
          task.category.toLowerCase() ==
          this.containerToCategory.name.toLowerCase()
        );
      });
      return result;
    }
  },
  methods: {
    addNew(data) {
      console.log(data);
      axios({
        method: "post",
        url: `https://tranquil-dusk-11569.herokuapp.com/tasks`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: data.title,
          description: data.description,
          category: data.category
        }
      })
        .then(result => {
          console.log(result);
          this.getTask();
          this.showModal = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editTask(data) {
      axios({
        method: "put",
        url: myUrl + "/tasks/" + data.id,
        headers: {
          token: localStorage.token
        },
        data: {
          title: data.title,
          description: data.description,
          category: data.category
        }
      })
        .then(result => {
          this.$emit(`getTask`);
          this.showEdit=false
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTask() {
      this.$emit("getTask");
    },
    exitModal() {
      console.log("exit ctegory");
      this.showModal = false;
    },
    exitEdit() {
      this.showEdit = false;
    },
    buttonEdit(task) {
      console.log(task, "di category");
      this.showEdit = true;
      this.newEdit = task;
    },
    dataEdit(data) {
      console.log(data);
      this.newEdit = data;
    }
  }
};
</script>

<style>
</style>