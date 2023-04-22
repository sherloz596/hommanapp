import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegistroPage from '../views/RegistroPage.vue'
import DespensasPage from '../views/DespensasPage.vue'
import Dashboard from '../views/Dashboard.vue'
import FavoritosPage from '../views/FavoritosPage.vue'
import CompraPage from '../views/CompraPage.vue'
import PreferenciasPage from '../views/PreferenciasPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginPage
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroPage
  },
  {
    path: '/Dashboard',
    name: 'dashboard',
    component: Dashboard,
    children:[
      {
        path: 'despensas',
        name: 'despensas',
        component: DespensasPage
      },
      {
        path: 'favoritos',
        name: 'favoritos',
        component: FavoritosPage
      },
      {
        path: 'compra',
        name: 'compra',
        component: CompraPage
      },
      {
        path: 'preferencias',
        name: 'preferencias',
        component: PreferenciasPage
      }
    ]
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
