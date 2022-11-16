<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col></v-col>
      <v-col cols="12" sm="8"> </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      menuOptions: {
        transition: 'slide-y-transition',
      },
      produits: [],
      form: {
        produit: null,
        stock: 1,
      },
    }
  },

  computed: {},
  watch: {},
  methods: {},
}
</script>
