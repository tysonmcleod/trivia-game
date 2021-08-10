<template>
  <div id="startScreen">
    <label>Name</label>
    <input @input="onNameChange" type="text" />

    <label>Difficulty</label>
    <select @change="onDifficultyChange">
      <option disabled selected>Select a difficulty</option>
      <option v-for="difficulty in difficulties" :key="difficulty">
      {{ difficulty }}
      </option
    ></select>

    <label>Category</label>
    <select @change="onCategoryChange">
      <option disabled selected>Select a category</option>
      <option v-for="category in getCategories" :key="category.id">
        {{ category.name }}
      </option>
    </select>

    <label>Number of Questions</label>
    <input @input="onNumberOfQuestionsChange" type="number" min="1" max="50" />

    <button @click="onStartClick">Start Game</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "StartScreen",
  data: function() {
    return {
      difficulties: ["easy", "medium", "hard"]
    }
  },
  methods: {
    ...mapState([
      "categories"
    ]),
    ...mapActions(["fetchCategories"]),
    ...mapMutations([
      "setDifficulty",
      "setCategory",
      "setNumberOfQuestions",
      "setName",
    ]),

    onStartClick() {
      if (
        this.$store.state.name !== "" &&
        this.$store.state.difficulty !== "" &&
        this.$store.state.category !== "" &&
        this.$store.state.numberOfQuestions !== 0
      ) {
        this.$router.push("/trivia");
      } else {
        const message = "You need to enter data for the following fields:\n" +
        ((this.$store.state.name === "") ? "Name\n" : "") +
        ((this.$store.state.difficulty === "") ? "Difficulty\n" : "") +
        ((this.$store.state.category === "") ? "Category\n" : "") +
        ((this.$store.state.numberOfQuestions === 0) ? "Number of Questions" : "")
        alert(message);
      }
    },
    onNameChange(event) {
      this.setName(event.target.value.trim());
    },
    onNumberOfQuestionsChange(event) {
      let questions = event.target.value;
      questions = questions > 50 ? 50 : questions < 1 ? 1 : questions;
      this.setNumberOfQuestions(questions);
    },
    onDifficultyChange(event) {
      this.setDifficulty(event.target.value.trim());
    },
    onCategoryChange(event) {
      this.setCategory(event.target.value);
    },
  },
  computed: {
    ...mapGetters(["getCategories"]),
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style>
</style>
