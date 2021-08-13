<template>
  <div class="container" id="app">
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

</style>
