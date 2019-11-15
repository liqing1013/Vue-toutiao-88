import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'// 引入组件
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less'
import axios from 'axios'
// 注意：加载第三方包中的具体文件不需要写具体路径，直接写报名即可
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'// 常态基地址
Vue.prototype.$axios = axios// 将axios共享到所有的实例接口调用
Vue.config.productionTip = false
Vue.use(ElementUi)// 注册全局组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
