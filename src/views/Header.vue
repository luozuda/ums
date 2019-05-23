<template>
  <a-layout-header class="header">
    <div class="logo">用户管理系统</div>
    <a-menu v-model="current" theme="dark" mode="horizontal">
      <template v-if="!this.$store.state.token">
        <a-menu-item key="login">
          <router-link to="/login">登录</router-link>
        </a-menu-item>
        <a-menu-item key="register">
          <router-link to="/register">注册</router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <a-tag color="cyan">{{this.$store.state.userName}}</a-tag>
        <a-menu-item key="login">
          <a @click.prevent="logout">退出</a>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {
  computed: {
    current() {
      return [this.$route.path.substring(1)];
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("setToken", "");
      this.$store.commit("setUserName", "");
      this.$router.replace("login");
    }
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  min-width: 360px;
  .logo {
    font-size: 20px;
    color: #fff;
  }
}
</style>
