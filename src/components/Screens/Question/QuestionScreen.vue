<template>
  <div id='questionScreen'>
    <div id="questions" v-if="triviaQuestions[currentQuestion]">
      <h3>Question: {{currentQuestion+1}}</h3>
      <div id="multiple-choice" v-if="triviaQuestions[currentQuestion].type === 'multiple' ">
        <p class="question" v-html="triviaQuestions[currentQuestion].question"></p> 
        <button class="answer" @click="onAnswerClick(triviaQuestions[currentQuestion].incorrect_answers[0])">{{triviaQuestions[currentQuestion].incorrect_answers[0]}}</button>
        <button class="answer" @click="onAnswerClick(triviaQuestions[currentQuestion].incorrect_answers[1])">{{triviaQuestions[currentQuestion].incorrect_answers[1]}}</button>
        <button class="answer" @click="onAnswerClick(triviaQuestions[currentQuestion].incorrect_answers[2])" >{{triviaQuestions[currentQuestion].incorrect_answers[2]}}</button>
        <button class="answer" @click="onAnswerClick(triviaQuestions[currentQuestion].correct_answer)" >{{triviaQuestions[currentQuestion].correct_answer}}</button>
      </div>
      <div id="true-false" v-else>
        <p class="question" v-html="triviaQuestions[currentQuestion].question"></p> 
        <button class="answer" @click="onAnswerClick(triviaQuestions[currentQuestion].incorrect_answers[0])">{{triviaQuestions[currentQuestion].incorrect_answers[0]}}</button>
        <button class="answer" @click="onAnswerClick(triviaQuestions[currentQuestion].correct_answer)">{{triviaQuestions[currentQuestion].correct_answer}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "QuestionScreen",
  data: function() {
    return {
      currentQuestion: 0,
    }
  },
  methods: {
    ...mapActions(["fetchQuestions"]),
    ...mapMutations(["addAnswer"]),
    onAnswerClick(value){
      this.currentQuestion++;
      this.addAnswer(value);
      if(this.currentQuestion === this.triviaQuestions.length){
        this.$router.push("/result");
      }
    }
  },
  computed: {
    ...mapState(["triviaQuestions", "userName", "answers"])
  },
  created() {
    if(this.userName === "") {
      this.$router.push("/");
    }
    this.fetchQuestions();
  }
}
</script>

<style scoped>
#questionScreen{
  margin-top: 20%;
  border: 2px solid black;
  border-radius: 5%;
  margin-left:auto;
  margin-right:auto;
  width:50%;
  padding: 3%;
}
.answer{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  border: 2px solid black;
  height: 50px;
  display:flex;
  width: 50%;
}
.question{
  font-size: 30px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
#questionScreen h3{
  font-size: 50px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  color: #0b035383;
}
</style>