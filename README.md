# ums

## ant-design-vue
命令行安装
```
npm i ant-design-vue -S
```
在main.js中引入
```
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(antd)
```

## axios
命令行安装
```
npm i axios -S
```
在main.js中引入
```
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(antd)
```
新建api.js,配置axios
```
import axios from 'axios'
import store from './store'

var api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'http://39.100.109.19:3000' :
        'http://localhost:3000'
})

//post默认请求头
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求处理
api.interceptors.request.use(config => {
    var token = localStorage.getItem('token')
    if (token) {
        config.headers.common["Authorization"] = token;//请求携带token
    }
    return config
})

//响应处理
api.interceptors.response.use(res => {
    if (res.data.code != 0) {//错误返回码
        return Promise.reject(res.data.msg)
    }
    return res
}, err => {
    if (err.response.status == 403) {//token无效或过期
        store.commit('logout')
    }
    return Promise.reject(err.response.data.msg)
})

export { api }
```
在vue实例中使用，例：
```
api.get(url,{params:{...}}).then(res=>{console.log(res)}).catch((err)=>{console.error(err)})
api.post(url,{...}).then(res=>{console.log(res)}).catch((err)=>{console.error(err)})
```

## vue-router
在router.js中引入使用
```
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Login from './views/user/Login.vue'

Vue.use(Router)
```
创建路由实例，并配置路由懒加载
```
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
```
配置全局前置守卫
```
router.beforeEach((to, from, next) => {
  if (!to.meta.noAuthorization) {//需要登录的页面
    var token = localStorage.getItem('token')
    var userName = localStorage.getItem('userName')
    if (token) {//如果本地缓存有token，则将本地缓存的token和userName设置到vuex的state里;
      store.commit('setToken', token);
      store.commit("setUserName", userName);
      next()
    } else {
      next('login')//没有token或token已过期，跳转到登录页面
    }
  } else {//免登陆页面
    next()
  }
})
```
导出模块
```
export default router
```

## vuex
在store.js中引入使用
```
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)
```
配置Store
```
const store = new Vuex.Store({
  state: {
    token: "",
    userName: ""
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserName(state, userName) {
      state.userName = userName
    },
    //退出当前账号
    logout(state) {
      localStorage.clear();
      state.token = ""
      state.userName = ""
      router.replace({ path: '/login' })
    }
  },
  actions: {

  }
})
```
导出模块
```
export default store
```
