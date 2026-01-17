import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TournamentsView from '../views/TournamentsView.vue'

const routes = [
  { path: '/', name: 'home', component: TournamentsView },
  { path: '/create', name: 'create', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
