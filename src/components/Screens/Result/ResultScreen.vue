<template>
  <div class="result-screen">
    <div v-if="this.getPoints === 0" class="result-header">
      <h3> You scored {{this.getPoints}} / {{
        this.triviaQuestions.length * 10}} points </h3>
    </div>
    <div v-else class="result-header">
      <h3> Congratulations {{this.userName}}! You scored {{this.getPoints}} / {{
        this.triviaQuestions.length * 10}} points </h3>
    </div>
    <div class="results">
      <table class="result-container" >
        <thead>
          <th>Question</th>
          <th>Correct answer </th>
          <th>Your answer </th>
        </thead>
        <tr v-for="(question, index) of triviaQuestions" :key="index">
          <td class="table-question" v-html="question.question"/>
          <td class="table-correct" v-html="question.correct_answer"/>
          <td :class="[isAnswerCorrect(index) ? 'correct' : 'wrong','question-text']" v-html="answers[index]"/>
        </tr>
      </table>
    </div>
    <button id="home-button" @click="onHomeClick">Home</button>
    <button id="restart-button" @click="onRestartClick">Restart Game</button>
  </div>
</template>
<script>

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "ResultScreen",
  methods: {
    ...mapMutations(["resetStore", "emptyAnswers"]),
    /**
     * Triggers when the user clicks the restart button,
     * This empties previously entered answer data and
     * redirects to the trivia page.
     */
    onRestartClick(event) {
      this.emptyAnswers(event.target.value);
      this.$router.push("/trivia");
    },
    /**
     * Triggers when the user clicks the home button,
     * This resets previous data that the user has entered
     * and then redirects to the home page.
     */
    onHomeClick(event) {
      this.resetStore(event.target.value);
      this.emptyAnswers(event.target.value);
      this.$router.push("/");
    },
  },
  /**
   * Checks that a user has entered a name,
   * this is simply done for redirection to the home screen, 
   * incase the user has entered from a wrong endpoint.
   */
  created() {
    if (this.userName === "") {
      this.$router.push("/");
    }
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

.result-screen{
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
  overflow:hidden;
}

.result-header{
  overflow: hidden;
  background-color: #A76E96;
  padding: 20px 10px;
}

.result-header h3{
  font-size: 30px;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  text-align: center;
}

.results{
  overflow-y: auto;
  height:40vh;
  padding: 5%;
  margin-top: 20px;
  margin-bottom:20px;
}

.correct,
.wrong {
  border: 1px solid black;
  border-radius: 3px;
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

table {
  background-color: #ffffff;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;  
}

th, td {
  text-align: left;
  border: 1px solid black;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

.result-screen button{
  background-color:#ffffff;
  padding: 16px 31px;
  color:#000000;
  cursor: pointer;
  width: 35%;
  display: inline-block;
  margin-bottom: 3%;
}

#home-button{
  margin-left: 15%;
}
#restart-button{
  margin-right: 15%;
}
</style>
