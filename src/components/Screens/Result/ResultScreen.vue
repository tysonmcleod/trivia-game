<template>
  <div id="result-container">
    <ul v-for="index in getQuestions().length" :key="index">
      <li>
        <span :class="[getClass(index - 1), 'question-text']">{{
          getQuestions()[index - 1]
        }}</span>
      </li>
    </ul>
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
      const QUESTIONS = [
        "Is pie flat?",
        "What are you waiting for?",
        "Some stuff happened, what?",
        "Is the earth not flat?",
        "True?",
      ];
      const points = this.getPoints();
      this.setHeaderText(`Congratulations! You scored ${points} / ${QUESTIONS.length * 10} points`);
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
#result-container {
  position: relative;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;  
}
#home-button {
  margin-left: 2rem;
  margin-bottom: 0;
}
#restart-button {
  margin-bottom: 0;
  margin-right: 2rem;
}

.correct {
  width: 0;
  border: 2px solid lightgreen;
}
.wrong {
  width: 0;
  border: 2px solid red;
}
.question-text {
  font-size: 24px;
}
</style>
