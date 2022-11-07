<!-- Please remove this file from your project -->
<template>
  <div>
    <v-card min-height="400" class="mx-auto" elevation="0">
      <p class="pt-10 mb-5">
        {{ $t('connexion.msg') }}
      </p>
      <div class="my-5 mx-3">
        <v-btn
          rounded
          color="primary"
          class="btn-connexion"
          dark
          outlined
          small
          block
          nuxt
          to="/login/connexion"
        >
          {{ $t('connexion.sigin') }}
        </v-btn>
      </div>
      <div class="mx-3 mb-5">
        <v-btn
          rounded
          color="primary"
          class="btn-connexion"
          dark
          small
          block
          nuxt
          to="/login/siginUp"
        >
          {{ $t('connexion.signUp') }}
        </v-btn>
      </div>
    </v-card>
    <LoginDialog ref="loginFormDialog" />
  </div>
</template>

<script>
import LoginDialog from './LoginDialog.vue'
export default {
  components: { LoginDialog },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    loginForm() {
      this.$refs.loginFormDialog.openDialog()
    },
    siginupForm() {
      this.$refs.loginFormDialog.openSiginUpDialog()
    },
  },
}
</script>
