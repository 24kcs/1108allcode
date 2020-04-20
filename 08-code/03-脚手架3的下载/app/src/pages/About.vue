<template>
  <div>About
     <p>{{id}}</p>
     <p>{{msg}}</p>
     <p>{{path}}</p>
  </div>
 
</template>
<script>
export default {
  name: 'About',
  props: ['id','msg','path']
}
</script>
<style scoped>
</style>