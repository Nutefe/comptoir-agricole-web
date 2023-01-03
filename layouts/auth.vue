<template>
  <v-app>
    <v-main class="bg-main">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'AuthLayout',
  data() {
    return {}
  },
}
</script>
<style scoped>
.bg-main{
  background-image: url('/img/back1.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  /* opacity: 0.65; */
  /* filter: blur(8px); */
}
</style>


