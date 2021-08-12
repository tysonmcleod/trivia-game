<template>
  <div class="grid-container" id="result">
    <div id="result-container" v-for="question in triviaQuestions" :key="question">
        <span v-if="isAnswerCorrect(index++) === true" :class="['correct', 'question-text', 'grid-item']">
          {{ question.question }} ✓
        </span>
        <span v-else :class="['wrong', 'question-text', 'grid-item']">
          {{ question.question }} ❌
        </span>
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
  data: function() {
    return {
      index: 0
    }
  },
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
    if(this.userName === "") {
      this.$router.push("/");
    }
    this.setHeaderText(
        `Congratulations! You scored ${this.getPoints} / ${
          this.triviaQuestions.length * 10
        } points`
      );
  },
  computed: {
    ...mapState(["triviaQuestions", "answers", "numberOfQuestions", "userName"]),
    ...mapGetters(["getPoints", "isAnswerCorrect"])
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
