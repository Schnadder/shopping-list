import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/:listid?', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
