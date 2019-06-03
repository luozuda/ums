<template>
  <a-layout-sider width="140" :style="{background: '#fff', borderRight:'1px solid #eee'}">
    <a-affix :offsetTop="64">
      <a-menu
        mode="inline"
        :defaultOpenKeys="defaultOpenKeys"
        v-model="current"
        :style="{borderRight: 0}"
      >
        <a-sub-menu v-for="submenu in submenus" :key="submenu.path">
          <span slot="title">{{submenu.title}}</span>
          <a-menu-item v-for="menuItem in submenu.menuItems" :key="menuItem.path">
            <router-link :to="menuItem.path">{{menuItem.title}}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-affix>
  </a-layout-sider>
</template>
<script>
export default {
  data() {
    return {
      submenus: [
        {
          path: "/customerManage",
          title: "用户管理",
          menuItems: [
            {
              path: "/customerManage/customers",
              title: "用户列表"
            },
            {
              path: "/customerManage/addCustomer",
              title: "添加用户"
            }
          ]
        },
        {
          path: "/customerAnalysis",
          title: "用户分析",
          menuItems: [
            {
              path: "/customerAnalysis/numOfCustomers",
              title: "男女人数比"
            }
          ]
        }
      ]
    };
  },
  computed: {
    defaultOpenKeys() {
      if (this.$route.matched.length > 0) {
        return [this.$route.matched[0].path];
      } else {
        return [this.submenus[0].path,this.submenus[1].path];
      }
    },
    current() {
      if (this.$route.matched.length > 0) {
        return [this.$route.matched[1].path];
      } else {
        return [];
      }
    }
  }
};
</script>
