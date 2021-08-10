<template>
  <div id="category">
    <option>
        <p>{{category.name}}</p>
    </option>
  </div>
</template>

<script>

export default {
  name: 'Category',
  props: [ "category" ]
}
</script>

<style>
</style>
