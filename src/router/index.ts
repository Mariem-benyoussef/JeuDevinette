import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Jeu from '../components/Jeu.vue';
// import Score from '../components/Score.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/jeu'
  },
  {
    path: '/home',
    redirect: '/jeu'
  },
  {
    path: '/jeu',
    name: 'Jeu',
    component: Jeu
  },
  // {
  //   path: '/score',
  //   name: 'Score',
  //   component: Score
  // },
  {
    path: '/jeu/score',
    component: () => import('../components/Score.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
