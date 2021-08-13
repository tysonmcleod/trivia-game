<template>
  <div id="startScreen">
    <div class="sc-header">
        <h1 class="animate__animated animate__bounceInDown">Welcome to QuizGame Deluxe</h1>
    </div>   
    <div class="form animate__animated animate__backInLeft">
      <div class="form-group top-left">
        <h3>Name</h3>
        <input
          id="name"
          @input="onNameChange"
          type="text"
          placeholder="Your name.."
        />
      </div>
      <div class="form-group top-right">
        <h3>Difficulty</h3>
        <select @change="onDifficultyChange">
          <option disabled selected>Select a difficulty</option>
          <option v-for="difficulty in difficulties" :key="difficulty">
            {{ difficulty }}
          </option>
        </select>
      </div>
    </div>
    <div class="form animate__animated animate__backInRight">
      <div class="form-group bottom-left">
        <h3>Category</h3>
        <select @change="onCategoryChange">
          <option disabled selected>Select a difficulty</option>
          <option :value="-1">Mixed</option>
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group bottom-right">
        <h3>Number of Questions</h3>
        <input
          @input="onNumberOfQuestionsChange"
          type="number"
          min="1"
          max="50"
        />
      </div>
    </div>
    <div class="sc-button animate__animated animate__backInUp">
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
    ]),

/**
 * Triggers when the start button is pressed. Checks if all fields are correctly
 * set and redirects to the trivia component, otherwise alerts the user
 *  with what fields still need to be filled.
 */
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
          (this.numberOfQuestions === 0 ? "\nNumber of Questions" : "");

        alert(message);
      }
    },
    onNameChange(event) {
      this.setName(event.target.value.trim());
    },
    /**
     * Fires up when the user changes the number of questions.
     * If the user enters an invalid value, then it gets reformatted
     * into a proper value.
     */
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
  },
};
</script>

<style>
#startScreen {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); 
}

.sc-header h1 {
  text-align: center;
  color: #000000;
  font-family: 'Courier New', monospace;
  margin: 10px 0;
  text-transform: uppercase;
  font: 700 38px 'Comfortaa', sans-serif;
  letter-spacing: 3px;
  margin-bottom: 30px;
}

.form {
  display: flex;
  text-align: center;
}


.form-group {
  float: left;
  width: 50%;
  height: 30vh;
  flex: 1;  
}

.form-group h3 {
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
  border-radius: 10px;
  text-transform: uppercase;
  padding: 5px;
}

.top-left {
  background-color: #E5C1BD;
}

.top-right {
  background-color: #D2D0BA;
}


.bottom-left {
  background-color: #B6BE9C;
}

.bottom-right {
  background-color: #7B9E87;
}

.sc-button button{
  background-color: #fff;
  padding: 16px 31px;
  color: #000;
  margin-top: 15px;
  cursor: pointer;
  width: 100%;
  
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  border-radius: 10px;
  text-transform: uppercase;  
}

input[type=text],input[type=number], select {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-weight: 600;
}

</style>
