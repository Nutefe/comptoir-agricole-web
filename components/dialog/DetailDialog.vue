<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    scrollable
    max-width="500"
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
        <template v-if="speculation">
          <v-carousel-item
            v-for="slide in speculation.fichiers"
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

      <template v-if="speculation">
        <v-card-title>{{ speculation.produit.designation }}</v-card-title>

        <v-card-text>
          <!-- <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">4.5 (413)</div>
        </v-row> -->

          <div class="my-4 text-subtitle-1">{{ speculation.produit.categorie.libelle }}</div>

          <div>
            {{speculation.description}}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>{{$t('speculation.etat')}}</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>{{speculation.stockSpontane}} stock spontane</v-chip>

            <v-chip>{{speculation.stockPrevisionnel}} stock previsionnel</v-chip>

            <v-chip>{{speculation.superficie}} superficie</v-chip>

            <v-chip>{{speculation.supNonExploite}} superficie nom exploite</v-chip>
          </v-chip-group>
        </v-card-text>

        <!-- <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">
            Reserve
          </v-btn>
        </v-card-actions> -->
      </template>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      selection: 1,
      speculation: null,
    }
  },

  methods: {

    openDialog(item) {
      this.dialog = true
      this.speculation = item
    },
  },
}
</script>
