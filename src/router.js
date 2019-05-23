import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Login from './views/Login.vue'

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
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
      meta: {
        noAuthorization: true
      }
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import(/* webpackChunkName: "customers" */ './views/Customers.vue')
    },
    {
      path: '/addCustomer',
      name: 'addCustomer',
      component: () => import(/* webpackChunkName: "addCustomer" */ './views/AddCustomer.vue')
    },
    {
      path: '*',
      redirect: '/customers'
    }
  ]
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.noAuthorization) {//需要登录的页面
    var token = localStorage.getItem('token')
    var userName = localStorage.getItem('userName')
    if (token) {//如果本地缓存有token，则将本地缓存的token和userName设置到vuex的state里;
      store.commit('setToken', token);
      store.commit("setUserName", userName);
      next()
    } else {
      next('login')//没有token或token已过期（未实现），跳转到登录页面
    }
  } else {//免登陆页面
    next()
  }
})

export default router