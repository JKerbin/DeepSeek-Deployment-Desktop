import { createRouter, createWebHashHistory } from "vue-router"
import InstanceManager from '../views/InstanceManager.vue'
import CreateInstance from '../views/CreateInstance.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: InstanceManager },
    { path: '/create', component: CreateInstance }
  ]
})

export default router
