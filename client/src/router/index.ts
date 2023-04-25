import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '../views/SignInView.vue'
import BudgetView from '../views/BudgetView.vue'
import WelcomeView from '../views/WelcomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/budget',
      name: 'budget',
      component: BudgetView
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInView
    }
  ]
})

export default router
