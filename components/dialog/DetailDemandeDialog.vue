<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    scrollable
    max-width="600"
  >
    <v-card :loading="loading" class="mx-auto">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-carousel
        cycle
        height="350"
        hide-delimiter-background
        :show-arrows="false"
        delimiter-icon="mdi-minus"
        dark
      >
        <template v-if="demande">
          <v-carousel-item
            v-for="slide in demande.fichiers"
            :key="`carousel-item-detail-${slide.id}`"
          >
            <v-img
              class="fill-height"
              :src="`${$axios.defaults.baseURL}/downloadFile/${slide.name}`"
            >
              <v-row class="fill-height" align="center"> </v-row>
            </v-img>
          </v-carousel-item>
        </template>
      </v-carousel>

      <template v-if="demande">
        <v-card-title>{{ demande.produit.designation }}</v-card-title>

        <v-card-text>
          <div class="my-4 text-subtitle-1">
            {{ demande.produit.categorie.libelle }}
          </div>

          <div>
            {{ demande.description }}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>{{ $t('demande.etat') }}</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>{{ demande.stockDemande }} stock souhaite</v-chip>

            <v-chip>{{ demande.prixSouhaite }} prix</v-chip>
          </v-chip-group>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    // forme: {
    //   type: String,
    //   default: 'false',
    //   required: true,
    // },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selection: 1,
      demande: null,
      stock: 1,
    }
  },

  methods: {
    openDialog(item) {
      this.dialog = true
      this.demande = item
    },
  },
}
</script>
