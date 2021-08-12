<template>
  <div id="app">
    <header><span id="header-text">{{this.$store.state.headerText}}</span></header>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  background-color: #F2E8E8;
  height: 100%;
  width: 100%;
}
header {
  background-color: #F37676;
  position: relative;
  height: 15vh;
  min-height: 6rem;
  margin-bottom: 2rem;
}
#header-text {
  color: white;
  font-size: 24px;
  margin-left: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
