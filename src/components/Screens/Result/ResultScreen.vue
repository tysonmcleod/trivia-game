<template>
  <div class="result-screen">
    <div v-if="this.getPoints === 0" class="result-header animate__animated animate__backInLeft">
      <h1> You scored {{this.getPoints}} / {{
        this.triviaQuestions.length * 10}} points </h1>
    </div>
    <div v-else class="result-header animate__animated animate__backInLeft">
      <h1> Congratulations {{this.userName}}! You scored {{this.getPoints}} / {{
        this.triviaQuestions.length * 10}} points </h1>
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
    <div class="rs-button animate__animated animate__backInUp">
      <button id="home-button" @click="onHomeClick">Home</button>
      <button id="restart-button" @click="onRestartClick">Restart</button>
    </div>
    
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
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); 
}

.result-header h1{
  text-align: center;
  color: #000000;
  font-family: 'Courier New', monospace;
  margin: 10px 0;
  font: 700 'Comfortaa', sans-serif;
  margin-bottom: 30px;
  font-size: calc(32px + 1vw);
}


.results{
  overflow-y: auto;
  max-height: 500px;
  border: 2px solid #000000;
}

.correct,
.wrong {
  border: 1px solid black;
  border-radius: 3px;
  padding: 1rem;
  margin: 0;
}

.correct {
  background-color: #a1e678;
}
.wrong {
  background-color: #e97c70;
  color: white;
}

table {
  background-color: #ffffff;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;  
}

th, td {
  text-align: center;
  border: 1px solid black;
  padding: 8px;
  height: 20px;
  font-family: "Courier New", monospace;
  font-size: calc(12px + 1vw);
  font-weight: 500;
}

tr:nth-child(even){background-color: #f2f2f2}
.rs-button{
  width: 100%;
  margin-top:10px;
}
.rs-button button{
  border: 2px solid #000000;
  background-color: #fff;
  padding: 16px 31px;
  color: #000;
  cursor: pointer;
  width: 50%;
  display: inline-block;
  margin-bottom: 3%;
  font-size: calc(12px + 1vw);
  font-weight: 600;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  border-radius: 10px;
  word-wrap: break-word;
}

#home-button{
  background-color: #E5C1BD;
}

#restart-button{
  background-color: #D2D0BA;
}
</style>
