import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('../views/InstanceManager.vue') },
    { path: '/create', component: () => import('../views/CreateInstance.vue') }
  ]
})

export default router
