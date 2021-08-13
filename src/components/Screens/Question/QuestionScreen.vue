<template>
  <div class="question-screen">
    <div class="question-body" v-if="triviaQuestions[currentQuestion]">
      <div class="question-header">
        <h3>Question: {{ currentQuestion + 1 }}</h3>
        <p
          class="question"
          v-html="triviaQuestions[currentQuestion].question"
        ></p>
      </div>
      <div class="buttons">
        <div class="button-group">
          <button
            v-for="question in currentQuestionAnswers"
            :key="question"
            class="answer"
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
    onAnswerClick(value) {
      this.addAnswer(value);
      this.currentQuestion++;
      if (this.currentQuestion === this.triviaQuestions.length) {
        this.$router.push("/result");
      } else {
        this.addAnswers();
      }
    },
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
.question-body {
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid black;
  background-color: #8e4162;
  position: fixed;
  width: 50%;
  top: 50%;
  left: 0px;
  right: 0px;
  transform: translateY(-50%);
  margin: auto;
}
.question-header {
  overflow: hidden;
  background-color: #a76e96;
  padding: 20px 10px;
}
.question-header h3 {
  font-size: 30px;
  color: #ffffff;
  font-family: "Courier New", monospace;
}
.question {
  color: #ffffff;
  font-family: "Courier New", monospace;
  font-size: 20px;
  font-weight: 500;
}
.button-group button {
  background-color: #ffffff;
  padding: 16px 31px;
  color: #000000;
  cursor: pointer;
  width: 100%;

  margin-top: 5%;
  display: inline-block;
  font-size: 32px;
}

.buttons {
  width: 70%;
  margin-left: 15%;
  margin-right: auto;
  margin-top: 4%;
  margin-bottom: 5%;
}
</style>