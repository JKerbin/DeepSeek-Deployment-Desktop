import { createRouter, createWebHashHistory } from "vue-router"
import InstanceManager from '../views/InstanceManager.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: InstanceManager }
  ]
})

export default router
