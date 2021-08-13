<template>
  <div id="startScreen">
    <div class="sc-header">
      <h3> Welcome to QuizGame Deluxe </h3>
    </div>
    <div class="form">
      <div class="form-group">
        <label>Name</label>
        <input id="name" @input="onNameChange" type="text" placeholder="Your name.."/>
      </div>
      <div class="form-group">
        <label>Difficulty</label>
        <select @change="onDifficultyChange">
        <option disabled selected>Select a difficulty</option>
        <option v-for="difficulty in difficulties" :key="difficulty">
          {{ difficulty }}
        </option>
      </select> 
      </div>
      <div class="form-group"> 
        <label>Category</label>
        <select @change="onCategoryChange">
        <option disabled selected>Select a difficulty</option>
        <option selected :value="-1">Mixed</option>
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
        </select>
      </div>
      <div class="form-group">
        <label>Number of Questions</label>
        <input @input="onNumberOfQuestionsChange" type="number" min="1" max="50" />
      </div>
      <button @click="onStartClick">Start Game</button>
    </div>
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
#startScreen{
  border-radius: 10px;
  border: 2px solid black;
  background-color: #8E4162;
  position: fixed;
  width: 50%;
  top: 50%;
  left: 0px;
  right: 0px;
  transform: translateY(-50%);
  margin: auto;
  overflow: hidden;
}

.sc-header h3{
  font-family: 'Courier New', monospace;
  margin: 5% 0;
  text-transform: uppercase;
  font: 700 32px 'Comfortaa', sans-serif;
  letter-spacing: 4px;
  color:#ffffff;
  text-align: center;
}

.form{
  width: 70%;
  margin-left:15%;
  margin-top:10%;
  margin-bottom: 10%;
}
.form-group{
  border-radius: 30px;
  padding: 3%;
  margin-bottom:3%;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Helvetica Neue', sans-serif;
  text-align: center;
}

.form-group label{
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
}

input[type=text], select, input[type=number] {
  width: 100%;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  padding:2% 1%;
}

.form button{
  background-color: #ffffff; 
  padding:16px 31px;
  color: #000000;
  margin-top:10px;
  cursor: pointer;
  width: 70%;
  margin-left: 15%;
  display: inline-block; 
  font-size: 20px;
  font-weight: 600;
  font-family: 'Helvetica Neue', sans-serif;
}
</style>
