<template>
  <a-layout-sider v-if="this.$store.state.token" width="140">
    <a-affix :offsetTop="64">
      <a-menu
        mode="inline"
        v-model="current"
        :defaultOpenKeys="['sub1']"
        :style="{ background: '#fff', width:'100%', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <span slot="title">用户管理</span>
          <a-menu-item key="customers">
            <router-link to="/customers">用户列表</router-link>
          </a-menu-item>
          <a-menu-item key="addCustomer">
            <router-link to="/addCustomer">添加用户</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-affix>
  </a-layout-sider>
</template>
<script>
export default {
  computed: {
    current() {
      return [this.$route.path.substring(1)];
    }
  }
};
</script>
