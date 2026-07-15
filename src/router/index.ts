import {
  createRouter,
  createWebHistory
} from "@ionic/vue-router"

import {
  RouteRecordRaw
} from "vue-router"

import TabsPage
from "../views/TabsPage.vue"

import {
  usuarioLogado
} from "@/composables/useAuth.js"

const routes:
Array<RouteRecordRaw> = [

  {
    path: "/",
    redirect: "/login"
  },

  {
    path: "/cadastro",
    component: () =>
      import(
        "@/views/CadastroPage.vue"
      ),

    meta: {
      public: true
    }
  },

  {
    path: "/login",
    component: () =>
      import(
        "@/views/LoginPage.vue"
      ),

    meta: {
      public: true
    }
  },

  {
    path: "/resetpass",
    component: () =>
      import(
        "@/views/ResetPassPage.vue"
      ),

    meta: {
      public: true
    }
  },

  {
    path: "/pages/",
    component: TabsPage,

    children: [
      {
        path: "",
        redirect:
          "/pages/album"
      },

      {
        path: "termos",
        component: () =>
          import(
            "@/views/SobrePage.vue"
          )
      },

      {
        path: "album",
        component: () =>
          import(
            "@/views/AlbumPage.vue"
          )
      },

      {
        path: "perfil",
        component: () =>
          import(
            "@/views/PerfilPage.vue"
          )
      },
      {
        path: "conquistas",
        component: () =>
          import(
            "@/views/ConquistasPage.vue"
          )
      },

      {
        path: "contato-cadastro",
        component: () =>
          import(
            "@/views/ContatoCadastroPage.vue"
          )
      },

      {
        path: "contato-lista",
        component: () =>
          import(
            "@/views/ContatoListPage.vue"
          )
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL
  ),

  routes
})

router.beforeEach(
  (to, from, next) => {

    const rotaPublica =
      to.meta.public

    const logado =
      !!usuarioLogado.value

    if (
      !rotaPublica &&
      !logado
    ) {
      return next("/login")
    }

    if (
      logado &&
      (
        to.path === "/login" ||
        to.path === "/cadastro"
      )
    ) {
      return next(
        "/pages/album"
      )
    }

    next()
  }
)

export default router