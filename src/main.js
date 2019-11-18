import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'// 引入组件
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less'
import axios from 'axios'
// 注意：加载第三方包中的具体文件不需要写具体路径，直接写报名即可
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
// 常态基地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios默认会把后端返回的数据使用JSON.parse转为对象给我们使用
// 同时它也提供了让我们自定义转换的功能
// axios在收到响应数据之后经过这里
axios.defaults.transformResponse = [function (data) {
  // try-catch为js的原生语法，与if-else语法一样，专门捕获异常
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    return {}
  }
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config代表请求的配置对象，指要发出的配置对象
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config// 代表通行的规则
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// // 响应拦截器
// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

Vue.prototype.$axios = axios// 将axios共享到所有的实例接口调用
// axios请求拦截器和响应拦截器
Vue.config.productionTip = false
Vue.use(ElementUi)// 注册全局组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
