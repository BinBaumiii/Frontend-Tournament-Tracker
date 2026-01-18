import { createRouter, createWebHistory } from 'vue-router'

import TournamentsView from '@/views/TournamentsView.vue'
import CreateTournamentView from '@/views/CreateTournamentView.vue'
import ScoreboardView from '@/views/ScoreboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/tournaments'
    },
    {
      path: '/scoreboard',
      component: ScoreboardView
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
