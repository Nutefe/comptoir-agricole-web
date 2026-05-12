<template>
  <v-footer color="secondary" fixed padless>
    <v-col class="text-center white--text" style="font-size: 12px" cols="12">
      {{ new Date().getFullYear() }} —
      <strong>{{ $t('commoin.copyright') }}</strong>
    </v-col>
  </v-footer>
</template>
