<template>
  <div id="app">
    <Header :style="{padding: '0 24px'}"></Header>
    <a-layout :style="{background: '#fff', paddingTop: '64px'}">
      <slider v-if="this.$store.state.token"></slider>
      <a-layout-content :style="{ padding: '24px', minHeight: '590px' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
    <a-layout-footer style="text-align: center">用户管理系统 ©2019 Created by 罗祖达</a-layout-footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Slider from "./components/Slider";
export default {
  components: {
    Header,
    Slider
  }
};
</script>

<style lang="scss">
form.ant-form {
  max-width: 300px;
  margin: 20px auto;
}
</style>
