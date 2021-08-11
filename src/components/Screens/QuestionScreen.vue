<template>
  <div id="questionScreen">
    <button @click="printName">Print</button>
  </div>
</template>

<script>
export default {
  name: "QuestionScreen",
  methods: {
    printName() {
      console.log(this.$store.state.name);
      this.$router.push("/result");
    },
  },
};
</script>

<style>
</style>
