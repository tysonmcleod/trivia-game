<template>
  <div id="startScreen">
    <label>Name</label>
    <input @input="onNameChange" type="text" />

    <label>Difficulty</label>
    <select @change="onDifficultyChange">
      <option disabled selected>Select a difficulty</option>
      <option v-for="difficulty in difficulties" :key="difficulty">
        {{ difficulty }}
      </option>
    </select>

    <label>Category</label>
    <select @change="onCategoryChange">
      <option selected :value="-1">Mixed</option>
      <option
        v-for="category in categories"
        :value="category.id"
        :key="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <label>Number of Questions</label>
    <input @input="onNumberOfQuestionsChange" type="number" min="1" max="50" />

    <button @click="onStartClick">Start Game</button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "StartScreen",
  data: function () {
    return {
      difficulties: ["easy", "medium", "hard"],
    };
  },
  methods: {
    ...mapActions(["fetchCategories"]),
    ...mapMutations([
      "setDifficulty",
      "setCategory",
      "setNumberOfQuestions",
      "setName",
      "setHeaderText",
    ]),

    onStartClick() {
      if (
        this.userName !== "" &&
        this.difficulty !== "" &&
        this.numberOfQuestions !== 0
      ) {
        this.$store.dispatch('fetchQuestions');
        this.$router.push("/trivia");
      } else {
        const message =
          "You need to enter data for the following fields:" +
          (this.userName === "" ? "\nName" : "") +
          (this.difficulty === "" ? "\nDifficulty" : "") +
          (this.numberOfQuestions === 0
            ? "\nNumber of Questions"
            : "");

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
    ...mapState(["categories", "userName", "difficulty", "numberOfQuestions"]),
  },
  created() {
    this.fetchCategories();
    this.setHeaderText("Welcome to QuizGame Deluxe");
  },
};
</script>

<style>
</style>
