<template>
  <div>
    <h2>Search</h2>
    <p>{{$route.params.keyword}}</p>
    <p>{{$route.query.keyword}}</p>
  </div>
</template>
<script>
export default {
  name: 'Search'
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>