import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '../views/SignInView.vue'
import BudgetView from '../views/BudgetView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import RefreshBudgetView from '../views/RefreshBudgetView.vue'
import CalendarView from '../views/CalendarView.vue'

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
      path: '/refreshbudget',
      name: 'refreshbudget',
      component: RefreshBudgetView
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue')
    }
  ]
})

export default router
