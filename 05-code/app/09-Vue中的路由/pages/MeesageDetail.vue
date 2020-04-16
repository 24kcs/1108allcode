<template>
  <ul>
    <!-- <li>id:{{$route.params.id}}</li> -->
      <li>id:{{id}}</li>
    <li>title:{{detail.title}}</li>
    <li>content:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  name: 'MessageDetail',
  props:['id'],
  data() {
    return {
      // 路由跳转的时候,把Message组件(id:1,3,5)中对应的那个id值传到当前这个组件中(MessageDetail)
      // 通过这个id,查找对应的数据,显示出来就可以了
      messageDetails: [
        { id: 1, title: 'message001', content: 'detail001' },
        { id: 3, title: 'message003', content: 'detail003' },
        { id: 5, title: 'message005', content: 'detail005' }
      ],
      detail: {} // 用来存储查询后的数据(根据id查找对应的对象数据---->存储到detail中,在li中显示)
    }
  },
  mounted() {
    //生命周期回调钩子---->只执行一次
    // console.log(this.$route.params.id)  此时的id值是字符串类型
    // const id = this.$route.params.id * 1
    // this.detail = this.messageDetails.find(message => message.id === id)
    this.showDetail(this.$route)
  },
  // 某个数据发生变化,要做相关的操作
  watch: {
    $route(val) {
      // const id = this.$route.params.id * 1
      // this.detail = this.messageDetails.find(message => message.id === id)
      this.showDetail(val)
    }
  },
  methods: {
    showDetail(route){
       const id = route.params.id * 1
      this.detail = this.messageDetails.find(message => message.id === id)
    }
  }
}
</script>
<style scoped>
</style>
