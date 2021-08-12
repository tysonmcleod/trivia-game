<template>
  <div class='question-screen'>
    <div class="question-body" v-if="triviaQuestions[currentQuestion]">
      <div class="question-header">
        <h3>Question: {{currentQuestion+1}}</h3>        
        <p class="question" v-html="triviaQuestions[currentQuestion].question"></p>
      </div>
      <div class="button-group">
        <button v-for="question in currentQuestionAnswers" :key="question" class="answer" @click="onAnswerClick(question)" v-html="question"/>
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
      currentQuestionAnswers:[]
    }
  },
  methods: {
    ...mapActions(["fetchQuestions"]),
    ...mapMutations(["addAnswer"]),
    onAnswerClick(value){
      this.addAnswer(value);
      this.currentQuestion++;
      if(this.currentQuestion === this.triviaQuestions.length){
        this.$router.push("/result");
      } else {
        this.addAnswers();
      }
    },
    addAnswers(){
      let answers = [this.triviaQuestions[this.currentQuestion].correct_answer];
      for(let i = 0; i < this.triviaQuestions[this.currentQuestion].incorrect_answers.length; ++i){
        answers.push(this.triviaQuestions[this.currentQuestion].incorrect_answers[i]);
      }
      this.currentQuestionAnswers = answers;
      this.currentQuestionAnswers.sort(() => (Math.random() > .5) ? 1: -1);
    }
  },
  computed: {
    ...mapState(["triviaQuestions", "userName", "answers"])
  },
  watch:{
    triviaQuestions: function(){
      this.addAnswers();
    }
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
.question-screen{
  padding: 0;
}
.question-body{
  background-color: #f2e8e8;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}
.question-header{
  overflow: hidden;
  background-color: #F37676;
  padding: 20px 10px;
}
.question-header h3{
  font-size: 30px;
  color: #ffffff;
  font-family: 'Courier New', monospace;
}
.question{
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 20px;
  font-weight: 500;
}
.button-group button{
  background-color: #ffffff; 
  padding:16px 31px;
  color: #000000; 
  cursor: pointer;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  display: inline-block; 
  font-size: 32px;
}

</style>