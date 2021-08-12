<template>
  <div id="result">
    <div class="grid-container">
      <div id="result-container" v-for="(question, index) of triviaQuestions" :key="index">
        <p :class="[isAnswerCorrect(index) ? 'correct' : 'wrong','question-text','grid-item',]">{{ question.question }}</p>
      </div>
    </div>
    <footer>
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
  },
  created() {
    if (this.userName === "") {
      this.$router.push("/");
    }
    this.setHeaderText(
      `Congratulations! You scored ${this.getPoints} / ${
        this.triviaQuestions.length * 10
      } points`
    );
  },
  computed: {
    ...mapState([
      "triviaQuestions",
      "answers",
      "numberOfQuestions",
      "userName",
    ]),
    ...mapGetters(["getPoints", "isAnswerCorrect"]),
  },
};
</script>

<style scoped>
#result {
  margin: 0 1rem;
  height: 100%;
  text-align: center;
}

.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-auto-rows: minmax(4rem);
  margin-bottom: 2rem;
  gap: 1ch;
}

footer {
  position: fixed;
  width: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0;
}

#home-button,
#restart-button {
  position: relative;
  min-width: 5rem;
  width: 10vw;
  height: 7vh;
}

#result-container {
  padding: 0;
}

#home-button {
  float: left;
}
#restart-button {
  float: right;
}

.correct,
.wrong {
  border: 1px solid black;
  border-radius: 20px;
  padding: 1rem;
  margin: 0;
}

.correct {
  background-color: lightgreen;
}
.wrong {
  background-color: crimson;
  color: white;
}
.question-text {
  font-size: 18px;
}
</style>
