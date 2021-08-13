<template>
  <div class="container" id="app">
    <!--<header><span id="header-text">{{this.$store.state.headerText}}</span></header>-->
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
  background-color: #C7E8F3;

}

.container{
  max-width: 960px;
  width:100%;
  position: relative;

}

/*
header {
  background-color: #F37676;
  position: relative;
  height: 15vh;
  min-height: 8rem;
  margin-bottom: 2rem;
}
#header-text {
  color: white;
  font-size:5vw;
  margin-left: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

*/
</style>
