<template>
  <div>
    <mt-button type="danger" @click="showMsg">danger</mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'App',
  data() {
    return {
      msg: '嘎嘎'
    }
  },
  methods: {
    showMsg(){
      console.log('嘎嘎')
      MessageBox('提示', '操作成功');
    }
  }
}
</script>
<style scoped>
</style>
