import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Upload from '../views/upload.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
