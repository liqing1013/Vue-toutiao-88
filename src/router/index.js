import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Login from '../views/login'
// @是VueCLI中提供的一种特殊路径规则，直接指向src
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'

// 加载 nprogress
import Nprogress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  // 一级路由主页容器
  {
    path: '/',
    component: Layout,
    // 二级子路由，主页main部分
    children: [
      { // 首页
        path: '',
        component: Home
      },
      { // 文章列表
        path: '/article',
        component: Article
      },
      { // 发布文章
        path: '/publish',
        component: Publish
      }

    ]
  },
  // 一级路由登录页容器
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // component: about
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
const router = new VueRouter({
  routes
})

// 路由的拦截器 beforeEach方法，该方法接收一个函数作为参数
// 参数1：to 表示去哪里的路由信息
// 参数2: from 表示来自哪里的路由信息
// 参数3：next 它是一个回调函数方法，用于路由放行,需要调用，不调用不放行
/// / next()-放行到要访问的页面
/// / next('/login)-跳转到指定路由
/// / next(false)-停止导航：在一些特殊情况下停留在当前页面，终断当前导航
/// / 1、具体要做的：判断用户得登录状态，悠久通过，没有跳转到登录页
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条
  Nprogress.start()
  // 2、如果访问的是登录页面，则直接放行
  if (to.path === '/login') {
    next()
    // 3、停止代码往后执行
    return
  }
  // 4、如果是非登录页面，才进行路由拦截等一系列操作
  // 5、获取用户token
  const token = window.localStorage.getItem('user-token')
  // 6、判断用户token,有就通过
  if (token) {
    // 导航通过，放行到要访问的地方
    next()
  } else {
    // 没有token，跳转到指定路由，返回首页
    next('/login')
    // 如果在登录页并且是非登录状态访问非登录页面，这里
    // 手动终止进度条，，否则进度条不会停止
    Nprogress.done()
  }
})

// 路由导航结束以后出发钩子函数
router.afterEach((to, from) => {
  Nprogress.done()
})
export default router
