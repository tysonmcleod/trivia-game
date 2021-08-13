<template>
  <div class="question-screen">
    <div class="question-header">
        <h1>Question: {{ currentQuestion + 1 }}</h1>
        <p
          class="question"
          v-html="triviaQuestions[currentQuestion].question"
        ></p>
    </div>
    <div class="question-body" v-if="triviaQuestions[currentQuestion]">
      <div class="buttons">
        <div class="button-group">
          <button
            v-for="(question,idx) in currentQuestionAnswers"
            :key="question"
            :class="`answer_${idx}`"
            @click="onAnswerClick(question)"
            v-html="question"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "QuestionScreen",
  data: function () {
    return {
      currentQuestion: 0,
      currentQuestionAnswers: [],
    };
  },
  methods: {
    ...mapActions(["fetchQuestions"]),
    ...mapMutations(["addAnswer"]),
    /**
     * Triggers when the user clicks an answer. This 
     * then increments the index used to retrieve the
     * current question. If all questions have been 
     * answered, the user is redirected to the home page,
     * otherwise, the next set of answers are retrieved. 
     */
    onAnswerClick(value) {
      this.addAnswer(value);
      this.currentQuestion++;
      if (this.currentQuestion === this.triviaQuestions.length) {
        this.$router.push("/result");
      } else {
        this.addAnswers();
      }
    },
     /**
     * This method is used to retrieve the next set of 
     * questions for the current question. The method 
     * does this buy adding the correct, and incorrect answers
     * to a list which is then sorted at random. 
     */
    addAnswers() {
      let answers = [this.triviaQuestions[this.currentQuestion].correct_answer];
      for (
        let i = 0;
        i < this.triviaQuestions[this.currentQuestion].incorrect_answers.length;
        ++i
      ) {
        answers.push(
          this.triviaQuestions[this.currentQuestion].incorrect_answers[i]
        );
      }
      this.currentQuestionAnswers = answers;
      this.currentQuestionAnswers.sort(() => (Math.random() > 0.5 ? 1 : -1));
    },
  },
  computed: {
    ...mapState(["triviaQuestions", "userName", "answers"]),
  },
  watch: {
    triviaQuestions: function () {
      this.addAnswers();
    },
  },
  /**
   * Checks if a user has entered a name. If not, they are
   * redirected to the home screen. If they have entered a name, 
   * the questions are fetched. This is done incase the user
   * has entered from an incorrect endpoint.
   */
  created() {
    if (this.userName === "") {
      this.$router.push("/");
    } else {
      this.fetchQuestions();
    }
  },
};
</script>

<style scoped>
.question-screen {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); 
}


.question-header h1 {
  text-align: center;
  color: #000000;
  font-family: 'Courier New', monospace;
  margin: 10px 0;
  text-transform: uppercase;
  font: 700 48px 'Comfortaa', sans-serif;
  letter-spacing: 3px;
  margin-bottom: 30px;
}

.question-header p{
  text-align: center;
  color: #000000;
  width: 70%;
  margin-left:15%;
}
.question {
  color: #000000;
  font-family: "Courier New", monospace;
  font-size: 28px;
  font-weight: 500;
}
.button-group button{
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

.buttons {
  width: 70%;
  margin-left: 15%;
  margin-right: auto;
  margin-top: 4%;
  margin-bottom: 5%;
}

.answer_0{
  background-color: #E5C1BD;
}
.answer_1{
  background-color: #D2D0BA;
}
.answer_2{
  background-color: #B6BE9C;
}
.answer_3{
  background-color: #7B9E87;
}
</style>