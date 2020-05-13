<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  // async mounted() {
  //   const result = await this.$API.trademark.getTrademarkList(1, 3)
  //   console.log(result)
  // }
  // async mounted() {
  //   // 根据三级分类的id和当前的页码及每页的条数,获取对应的spu的数据
  //   const result1 = await this.$API.spu.getSpuList(1, 3, 61)
  //   console.log(result1.data)
  //   const result2 = await this.$API.sku.getSkuList(1, 3)
  //   console.log(result2.data)
  // }
}
</script>
