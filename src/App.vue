<template>
  <div id="app">
    <Header></Header>
    <a-layout style="padding-top: 64px;">
      <slider></slider>
      <a-layout-content :style="{ background: '#fff', padding: '24px', minHeight: '600px' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
    <a-layout-footer style="text-align: center">用户管理系统 ©2019 Created by 罗祖达</a-layout-footer>
  </div>
</template>

<script>
import Header from "./views/Header";
import Slider from "./views/Slider";
export default {
  components: {
    Header,
    Slider
  }
};
</script>

<style lang="scss">
.header.ant-layout-header {
  padding: 0 24px;
}
form.ant-form {
  max-width: 300px;
  margin: 20px auto;
}
</style>
