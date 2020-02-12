import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WARS from '../views/WARS.vue'
import Scraper from '../views/Scraper.vue'
import HKCaseDetail from '../views/WARS_HKCase_Detail.vue'
import HK from '../views/WARS_HK.vue'
import ErrorPage from '../views/ErrorPage.vue'
import Test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  { path: '/404', component:ErrorPage },  
  { path: '*', redirect: '/404' },  
  {
    path: '/wars',
    name: 'wars',
    component: WARS
  },
  {
    path: '/wars/news',
    name: 'scraper',
    component: Scraper
  },
  {
    path: '/wars/hk-case-details',
    name: 'HK Case Details',
    component: HKCaseDetail
  },
  {
    path: '/wars/hk',
    name: 'HK',
    component: HK
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router