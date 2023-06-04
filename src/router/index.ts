import HomePage from '@/pages/HomePage/index.vue'
import LoginPage from '@/pages/Login/index.vue'
import RegisterPage from '@/pages/Register/index.vue'

import {
  createRouter,
  createWebHistory,
  type RouteParams,
  type RouteRecordRaw
} from 'vue-router'

export type AppRouteNames =
  | 'global-feed'
  | 'my-feed'
  | 'tag'
  | 'article'
  | 'create-article'
  | 'edit-article'
  | 'login'
  | 'register'
  | 'profile'
  | 'profile-favorites'
  | 'settings'

export const routes: RouteRecordRaw[] = [
  {
    name: 'global-feed',
    path: '/',
    component: HomePage,
    meta: {
      layout: 'Default'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      layout: 'Auth'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterPage,
    meta: {
      layout: 'Auth'
    }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

export function routerPush(
  name: AppRouteNames,
  params?: RouteParams
): ReturnType<typeof router.push> {
  return !params
    ? router.push({
        name,
        params
      })
    : router.push({ name })
}
