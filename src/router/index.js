import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import city from '../pages/city.vue'
import msite from '../pages/msite.vue'
import login from '../pages/login.vue'
import forget from '../pages/forget.vue'
import food from '../pages/food.vue'
import xx from '../pages/xx.vue'
import shop from '../pages/shop/shop.vue'
import search from '../pages/search.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/city/:id',
      name: 'city',
      component: city
    },
    {
      path: '/msite/:geohash',
      name: 'msite',
      component: msite
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/xx',
      name: 'xx',
      component: xx
    },
    {
      path: '/food',
      name: 'food',
      component: food
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/search/:geohash',
      name: 'search',
      component: search
    }
  ]
})
