import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/container'
import Search from '@/pages/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container',
      component: Container
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
