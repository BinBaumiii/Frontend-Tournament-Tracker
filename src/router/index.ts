import { createRouter, createWebHistory } from 'vue-router'

import TournamentsView from '@/views/TournamentsView.vue'
import CreateTournamentView from '@/views/CreateTournamentView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/tournaments'
    },
    {
      path: '/tournaments',
      component: TournamentsView
    },
    {
      path: '/tournaments/new',
      component: CreateTournamentView
    }
  ]
})

export default router
