import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import store from './store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(item => item.meta.requireAuth)) {
    //需要登录的网站检查store中有没有userinfo和logged，有再进入，无跳转到单独的login
    // 单独的login和signup还没有写
    console.log('需要登录')

    if (!store.getters.getStoreLoginStatus) {
      //引入axios再get会导致session丢失
      //全局只能引入一个axios 在main.js中挂载在vue上
      let res = await Vue.axios.get('http://localhost:3000/login').catch(err => console.error(err))
      if (res.data.res === "success") {
        store.commit("LogIn", res.data.userinfo);
        next()
      } else {

        next('/login')
      }
      // }
    } else {

      next()
    }
  } else {
    next()
  }
})

export default router;