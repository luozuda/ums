import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Login from './views/user/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        noAuthorization: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/user/Register.vue'),
      meta: {
        noAuthorization: true
      }
    },
    {
      path: '/customerManage',
      name: 'customerManage',
      component: () => import(/* webpackChunkName: "customerManage" */ './views/CustomerManage.vue'),
      children: [
        {
          path: 'customers',
          name: 'customers',
          component: () => import(/* webpackChunkName: "customerManage" */ './components/Customers.vue')
        },
        {
          path: 'addCustomer',
          name: 'addCustomer',
          component: () => import(/* webpackChunkName: "customerManage" */ './components/AddCustomer.vue')
        }
      ]
    },
    {
      path: "/customerAnalysis",
      name: 'customerAnalysis',
      component: () => import(/* webpackChunkName: "customerAnalysis" */ './views/CustomerAnalysis.vue'),
      children: [
        {
          path: "numOfCustomers",
          name: "numOfCustomers",
          component: () => import(/* webpackChunkName: "customerAnalysis" */ './components/NumOfCustomers.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/customerManage/customers'
    }
  ]
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.noAuthorization) {//免授权认证
    next()
  } else {//需要授权认证
    var token = localStorage.getItem('token')
    var userName = localStorage.getItem('userName')
    if (token) {//如果本地缓存有token，则将本地缓存的token和userName设置到vuex的state里;
      store.commit('setToken', token);
      store.commit("setUserName", userName);
      next()
    } else {
      next('login')//如果没有token，则跳转到登录页面
    }
  }
})

export default router