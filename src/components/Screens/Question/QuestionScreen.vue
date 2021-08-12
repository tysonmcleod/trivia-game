<template>
  <div class='question-screen'>
    <div class="question-body" v-if="triviaQuestions[currentQuestion]">
      <div class="question-header">
        <h3>Question: {{currentQuestion+1}}</h3>        
        <p class="question" v-html="triviaQuestions[currentQuestion].question"></p>
      </div>
      <div class="button-group">
        <button v-for="question in currentQuestionAnswers" :key="question" class="answer" @click="onAnswerClick($event)" v-html="question"/>
      </div>
      <div class="question-footer">
        <button @click="onSkipClick">Skip</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "QuestionScreen",
  components:{
  },
  data: function() {
    return {
      currentQuestion: 0,
      currentQuestionAnswers:[],
    }
  },
  methods: {
    ...mapMutations(["addAnswer"]),
    onAnswerClick(event){
      this.currentQuestion++;
      this.addAnswer(event.target.value);
      if(this.currentQuestion == this.triviaQuestions.length){
        this.$router.push("/result");
      }
      this.addAnswers();
    }, 
    onSkipClick(event){
      console.log(event);
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
    ...mapState(["triviaQuestions"])
  }, 
  watch:{
    triviaQuestions: function(){
     this.addAnswers();
    }
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

.question-footer{
  width: 100%;
  left: 0px;
  margin-left:auto;
  margin-right:auto;
  bottom: 0px;
}

.question-footer button{
  background-color: #ffffff;
  padding: 10px 10px;
  color:#000000;
  cursor: pointer;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  float:right;
  font-size: 25px;
}


</style>