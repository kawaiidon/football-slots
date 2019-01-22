import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import store from './store'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
  store.commit('LOGIN_POPUP_STATE', true)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/football',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '*', redirect: '/' },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/terms',
      name: 'terms',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Terms.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/Privacy.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: ifAuthenticated,
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/',
      name: 'slots',
      component: () => import('./views/Slots.vue')
    },
    {
      path: '/entries',
      name: 'entries',
      beforeEnter: ifAuthenticated,
      component: () => import('./views/Entries.vue')
    },
    {
      path: '/results',
      name: 'results',
      beforeEnter: ifAuthenticated,
      component: () => import('./views/Results.vue')
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import('./views/Rules.vue')
    },
    {
      path: '/howto',
      name: 'howto',
      component: () => import('./views/HowToPlay.vue')
    },
    {
      path: '/thankyou',
      name: 'bot',
      component: () => import('./views/Bot.vue')
    }
  ]
})
