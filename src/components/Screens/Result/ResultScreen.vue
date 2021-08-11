<template>
  <div id="result">
    <div id="result-container" v-for="index in getQuestions().length" :key="index">
      <div id="correct-column" v-if="getResult()[index - 1] === true">
        <span :class="['correct', 'question-text']">
          {{ getQuestions()[index - 1] }}
        </span>
      </div>
      <div id="wrong-column" v-else>
        <span :class="['wrong', 'question-text']">
          {{ getQuestions()[index - 1] }}
        </span>
      </div>
    </div>
    <footer>
      <button id="home-button" @click="onHomeClick">Home</button>
      <button id="restart-button" @click="onRestartClick">Restart</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ResultScreen",
  methods: {
    ...mapGetters(["getPoints"]),
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
        //this.$store.state.triviaQuestions;
        [
          "Is pie flat?",
          "What are you waiting for?",
          "Some stuff happened, what?",
          "Is the earth not flat?",
          "True?",
        ];
      const points = this.getPoints();
      this.setHeaderText(
        `Congratulations! You scored ${points} / ${
          QUESTIONS.length * 10
        } points`
      );
      return QUESTIONS;
    },
    getResult() {
      return [true, false, true, true, true];
    },
    getClass(index) {
      return this.getResult()[index] ? "correct" : "wrong";
    },
  },
};
</script>

<style scoped>
#result {

}

#result-container {
  width: 100%;
  margin: 1rem;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
}

#home-button, #restart-button {
  min-width: 5rem;
  width: 10vw;
  height: auto;
}

#home-button {
  margin-left: 4rem;
  float: left;
}
#restart-button {
  margin-right: 4rem;
  float: right;
}

.correct, .wrong {
  width: 0;
}

.correct {
  background-color: lightgreen;
}
.wrong {
  background-color: red;
}
.question-text {
  padding: 1rem;
  font-size: 24px;
}
</style>
