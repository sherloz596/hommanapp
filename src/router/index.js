import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegistroPage from '../views/RegistroPage.vue'
import DespensasPage from '../views/DespensasPage.vue'
import Dashboard from '../views/Dashboard.vue'
import FavoritosPage from '../views/FavoritosPage.vue'
import CompraPage from '../views/CompraPage.vue'
import ProductosPage from '../views/ProductosPage.vue'
import ComprasAnterioresPage from '../views/ComprasAnterioresPage.vue'
import UnidadesPage from '../views/UnidadesPage.vue'
import RecoveryPage from '../views/RecoveryPage.vue'
import ResetPassPage from '../views/ResetPassPage.vue'
import RegistroGuestPage from '../views/RegistroGuestPage.vue'
import InvitarPage from '../views/InvitarPage.vue'
import TareasPage from '../views/TareasPage.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginPage,
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresAuth: false
    },
    component: LoginPage,
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroPage
  },
  {
    path: '/reset/:id/:token',
    name: 'reset',
    component: ResetPassPage
  },
  {
    path: '/registro-guest/:id/:email',
    name: 'registro-guest',
    component: RegistroGuestPage
  },
  {
    path: '/recovery',
    name: 'recovery',
    component: RecoveryPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
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
        component: CompraPage,
      },
      {
        path: 'productos',
        name: 'productos',
        component: ProductosPage
      },
      {
        path: 'tareas',
        name: 'tareas',
        component: TareasPage
      },
      {
        path: 'anteriores',
        name: 'anteriores',
        component: ComprasAnterioresPage
      },
      {
        path: 'unidades',
        name: 'unidades',
        component: UnidadesPage
      },
      {
        path: 'invitar',
        name: 'invitar',
        component: InvitarPage
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (store.state.auth) {
      next({ path: "dashboard/" });
    }else{
      next();
    }
  }
});

export default router
