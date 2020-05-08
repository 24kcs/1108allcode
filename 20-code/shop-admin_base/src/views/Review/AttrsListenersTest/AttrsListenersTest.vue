<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- <a href="javascript:;" title="添加">
      <el-button type="primary" icon="el-icon-plus" size="mini">添加</el-button>
    </a>-->
    <LinkButton title="添加" type="primary" icon="el-icon-plus" size="mini" @click="add" />
    <LinkButton
      title="修改"
      type="info"
      icon="el-icon-edit"
      size="mini"
      @dblclick.native="add2"
    />
    <LinkButton title="删除" type="danger" icon="el-icon-delete" size="mini" @click="del" />
  </div>
</template>

<script type="text/ecmascript-6">
import LinkButton from './LinkButton'
export default {
  name: 'AttrsListenersTest',
  methods: {
    add() {
      alert('添加')
    },
    update() {
      alert('修改')
    },
    del() {
      alert('删除')
    },
    add2(event) {
      alert('双击了'+ event.target.tagName)
    }
  },
  components: {
    LinkButton
  }
}
</script>
