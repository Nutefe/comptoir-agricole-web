<template>
  <v-app>
    <DefaultDrawer
      v-if="$vuetify.breakpoint.mobile"
      :profile-route="profileRoute"
      :logout="logout"
      :simple-routes="simpleRoutes"
      :admin-routes="adminRoutes"
      :login="login"
      :siginup="siginup"
      :siginup-exp="siginupExp"
      :speculation="speculation"
      :speculation-ag="speculationCo"
      :demande="demande"
      :mesdemande="mesdemande"
    />

    <DefaultAppBar
      :profile-route="profileRoute"
      :logout="logout"
      :simple-routes="simpleRoutes"
      :admin-routes="adminRoutes"
      :login="login"
      :siginup="siginup"
      :siginup-exp="siginupExp"
      :speculation="speculation"
      :speculation-ag="speculationCo"
      :demande="demande"
      :mesdemande="mesdemande"
    />
    <v-main class="bg-main">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import DefaultAppBar from '~/components/menu/DefaultAppBar.vue'
import DefaultDrawer from '~/components/menu/DefaultDrawer.vue'
import FooterBar from '~/components/menu/FooterBar.vue'
// import LoginDialog from '~/components/page/login/LoginDialog.vue'

export default {
  name: 'DefaultLayout',

  components: {
    DefaultAppBar,
    DefaultDrawer,
    FooterBar,
    // LoginDialog,
  },

  data() {
    return {
      speculation: {
        title: this.$t('navigation.speculation.agregateur'),
        subtitle: this.$t('navigation.speculation'),
        path: '/speculation/agregateur',
      },
      speculationCo: {
        title: this.$t('navigation.speculation.exploitant'),
        subtitle: this.$t('navigation.speculation'),
        path: '/speculation/exploitant',
      },
      demande: {
        title: this.$t('navigation.demande.admin'),
        subtitle: this.$t('navigation.demande.title'),
        path: '/demande/admindemande',
      },
      mesdemande:{
        title: this.$t('navigation.demande.mes'),
        subtitle: this.$t('navigation.demande.title'),
        path: '/demande/mesdemande',
      },
      profileRoute: {
        title: this.$t('navigation.profil'),
        subtitle: this.$t('navigation.profil'),
        path: '/profil',
      },
      logout: {
        title: this.$t('logout.action'),
        icon: 'mdi-logout',
      },

      login: {
        title: this.$t('connexion.sigin'),
        icon: 'mdi-logout',
        path: '/login/connexion',
      },

      siginup: {
        title: this.$t('connexion.signUp'),
        icon: 'mdi-logout',
      },
      siginupExp: {
        title: this.$t('connexion.signUpExp1'),
        icon: 'mdi-logout',
      },

      simpleRoutes: [
        {
          title: this.$t('navigation.accueil'),
          path: '/',
          icon: 'mdi-home',
        },
        {
          title: this.$t('navigation.speculation.title'),
          path: '/speculation',
          icon: 'mdi-chart-scatter-plot-hexbin',
        },
        {
          title: this.$t('navigation.commande'),
          path: '/demande',
          icon: 'mdi-shopping',
        },
      ],

      adminRoutes: {
        title: this.$t('navigation.dashboard'),
        icon: 'mdi-tune',
        paths: [
          {
            title: this.$t('navigation.user.title'),
            icon: 'mdi-account',
            paths: [
              {
                title: this.$t('navigation.user.agregateur'),
                path: '/user/agregateur',
                icon: 'mdi-account',
              },
              {
                title: this.$t('navigation.user.exploitant'),
                path: '/user/exploitant',
                icon: 'mdi-account-multiple',
              },
              {
                title: this.$t('navigation.user.client'),
                path: '/user/client',
                icon: 'mdi-file-chart-outline',
              },
              {
                title: this.$t('navigation.user.admin'),
                path: '/user/admin',
                icon: 'mdi-file-chart-outline',
              },
              // {
              //   title: this.$t('navigation.user.role'),
              //   path: '/user/role',
              //   icon: 'mdi-file-chart-outline',
              // },
            ],
          },

          {
            title: this.$t('navigation.localite.title'),
            icon: 'mdi-file-chart-outline',
            paths: [
              {
                title: this.$t('navigation.localite.pays'),
                path: '/localite/pays',
                icon: 'mdi-file-chart-outline',
              },
              {
                title: this.$t('navigation.localite.region'),
                path: '/localite/region',
                icon: 'mdi-file-chart-outline',
              },
              {
                title: this.$t('navigation.localite.ville'),
                path: '/localite/ville',
                icon: 'mdi-file-chart-outline',
              },
            ],
          },
          {
            title: this.$t('navigation.parametre.title'),
            icon: 'mdi-file-chart-outline',
            paths: [
              {
                title: this.$t('navigation.parametre.magasin'),
                path: '/parametre/magasin',
                icon: 'mdi-file-chart-outline',
              },
              {
                title: this.$t('navigation.parametre.categorie'),
                path: '/parametre/categorie',
                icon: 'mdi-file-chart-outline',
              },
              {
                title: this.$t('navigation.parametre.produit'),
                path: '/parametre/produit',
                icon: 'mdi-file-chart-outline',
              },
              {
                title: this.$t('navigation.parametre.slide'),
                path: '/parametre/slide',
                icon: 'mdi-file-chart-outline',
              },
              // {
              //   title: this.$t('navigation.parametre.typeSpeculation'),
              //   path: '/parametre/typeSpeculation',
              //   icon: 'mdi-file-chart-outline',
              // },
            ],
          },
        ],
      },
    }
  },
}
</script>
<style scoped>
.bg-main{
  background-image: url('/img/back2.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  /* opacity: 0.65; */
  /* filter: blur(8px); */
}
</style>