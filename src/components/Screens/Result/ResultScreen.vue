<template>
  <div class="grid-container" id="result">
    <div id="result-container" v-for="index in getQuestions().length" :key="index">
      <div class="grid-item correct-row" v-if="getResult()[index - 1] === true">
        <span :class="['correct', 'question-text']">
          {{ getQuestions()[index - 1] }} ✓
        </span>
      </div>
      <div class="grid-item wrong-row" v-else>
        <span :class="['wrong', 'question-text']">
          {{ getQuestions()[index - 1] }} ❌
        </span>
      </div>
    </div>
    <footer class="grid-item">
      <button id="home-button" @click="onHomeClick">Home</button>
      <button id="restart-button" @click="onRestartClick">Restart Game</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "ResultScreen",
  methods: {
    ...mapMutations(["resetStore", "emptyAnswers", "setHeaderText"]),
    onRestartClick(event) {
      this.emptyAnswers(event.target.value);
      this.$router.push("/trivia");
    },
    onHomeClick(event) {
      this.resetStore(event.target.value);
      this.emptyAnswers(event.target.value);
      this.$router.push("/");
    },
    getQuestions() {
      const QUESTIONS =
        [
          "Is pie flat?",
          "What are you waiting for?",
          "Some stuff happened, what?",
          "Is the earth not flat?",
          "True?",
          "Buttons!",
          "What does the fridget say?",
          "Test test?",
          "Ich!"
        ];
      this.setHeaderText(
        `Congratulations! You scored ${this.getPoints} / ${
          QUESTIONS.length * 10
        } points`
      );
      return QUESTIONS;
    },
    getResult() {
      return [true, false, true, true, true, false, false, true, false];
    }
  },
  computed: {
    ...mapState(["triviaQuestions", "answers"]),
    ...mapGetters(["getPoints"])
  }
};
</script>

<style scoped>

#result {
  margin: 0 1rem;
  height: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-auto-rows: minmax(4rem);
}

footer {
  grid-row: -1;
}

#home-button, #restart-button {
  min-width: 5rem;
  width: 10vw;
  height: 7vh;
}

#home-button {
  float: left;
}
#restart-button {
  float: right;
}

.correct, .wrong {
  border-radius: 20px;
  padding: 1rem;
}

.correct {
  background-color: lightgreen;
}
.wrong {
  background-color: red;
}
.question-text {
  font-size: 18px;
}
</style>
