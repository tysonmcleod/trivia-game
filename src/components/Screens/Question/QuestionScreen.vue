<template>
  <div id='questionScreen'>
    <div id="questions" v-if="getTriviaQuestions[currentQuestion]">
      <h3>Question: {{currentQuestion+1}}</h3>
      <div id="multiple-choice" v-if="getTriviaQuestions[currentQuestion].type === 'multiple' ">
        <p id="question" v-html="getTriviaQuestions[currentQuestion].question"></p> 
        <button class="answer" @click="onAnswerClick($event)">{{getTriviaQuestions[currentQuestion].incorrect_answers[0]}}</button>
        <button class="answer" @click="onAnswerClick($event)">{{getTriviaQuestions[currentQuestion].incorrect_answers[1]}}</button>
        <button class="answer" @click="onAnswerClick($event)">{{getTriviaQuestions[currentQuestion].incorrect_answers[2]}}</button>
        <button class="answer" @click="onAnswerClick($event)">{{getTriviaQuestions[currentQuestion].correct_answer}}</button>
      </div>
      <div id="trueFalse" v-else>
        <p id="question" v-html="getTriviaQuestions[currentQuestion].question"></p> 
        <button class="answer" @click="onAnswerClick($event)">{{getTriviaQuestions[currentQuestion].incorrect_answers[0]}}</button>
        <button class="answer" @click="onAnswerClick($event)">{{getTriviaQuestions[currentQuestion].correct_answer}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "QuestionScreen",
  components:{
  },
  data: function() {
    return {
      currentQuestion: 0,
    }
  },
  methods: {
    ...mapActions(["fetchQuestions"]),
    ...mapMutations(["addAnswer"]),
    onAnswerClick(event){
      this.currentQuestion++;
      this.addAnswer(event.target.value);
      if(this.currentQuestion == this.getTriviaQuestions.length){
        console.log("its over");
        this.$router.push("/result");
      }
    }
  },
  computed: {
    ...mapGetters(["getTriviaQuestions"]),
  },
 
  created() { 
    console.log(this.getTriviaQuestions);
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
#question{
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