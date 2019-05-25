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

var api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'http://39.100.109.19:3000/api' :
        'http://localhost:3000/api'
})

//所有请求携带token和userName
api.interceptors.request.use(config => {
    config.headers.common["Authorization"] = localStorage.getItem("token");
    config.headers.common["userName"] = localStorage.getItem("userName");
    return config
})

export { api }
```
使用示例
```
api.get(url,{params:{...}}).then(res=>{console.log(res)}).catch((err)=>{console.error(err)})
```

# vue-router
路由基本配置与路由懒加载
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
      next('login')//没有token或token已过期（未实现），跳转到登录页面
    }
  } else {//免登陆页面
    next()
  }
})
```
