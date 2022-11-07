<template>
  <div>
    <v-dialog
      :fullscreen="$vuetify.breakpoint.sm"
      persistent
      scrollable
      max-width="900"
    >
      <!-- <v-window v-model="step">
        <v-window-item :value="1">
          <LoginForm />
        </v-window-item>

        <v-window-item :value="2">
          <SiginUpForm />
        </v-window-item>
      </v-window> -->
    </v-dialog>
  </div>
</template>

<script>
// import LoginForm from './LoginForm.vue'
// import SiginUpForm from './SiginUpForm.vue'

export default {
  // components: { SiginUpForm, LoginForm },
  data() {
    return {}
  },

  computed: {
    step: {
      get() {
        return this.$store.getters.step
      },
      set(newValue) {
        this.$store.dispatch('setStep', newValue)
      },
    },
    dialog: {
      get() {
        return this.$store.getters.loginDialog
      },
      set(newValue) {
        this.$store.dispatch('toggleLoginDialog', newValue)
      },
    },
  },

  methods: {
    openDialog() {
      this.$store.dispatch('setStep', 1)
      this.$store.dispatch('toggleLoginDialog', true)
    },

    openSiginUpDialog() {
      this.$store.dispatch('setStep', 2)
      this.$store.dispatch('toggleLoginDialog', true)
    },

    loginForm() {
      this.$store.dispatch('setStep', 1)
    },

    siginupForm() {
      this.$store.dispatch('setStep', 2)
    },
  },
}
</script>
