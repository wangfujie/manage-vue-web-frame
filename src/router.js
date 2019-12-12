import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/views/Basic.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: '欢迎进入系统！',
      component: Basic
    },
    {
      path: '/login.html',
      name: 'login',
      component: Login
    },
    {
      path: '/basic',
      name: 'basic',
      meta: '',
      component: () => import('@/views/Basic.vue'),
      children:[
        {
          path: 'welcomeHome.html',
          name: 'welcomeHome',
          meta: '欢迎页',
          component: () => import('@/views/basic/WelcomeHome.vue')
        },
        {
          path: 'recordData.html',
          name: 'recordData',
          meta: '数据浏览',
          component: () => import('@/views/basic/RecordData.vue')
        }
      ]
    }
  ]
})
