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

          <div class="my-4 text-subtitle-1">
            {{ speculation.produit.categorie.libelle }}
          </div>

          <div>
            {{ speculation.description }}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>{{ $t('speculation.etat') }}</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>{{ speculation.stockSpontane }} stock spontane</v-chip>

            <v-chip
              >{{ speculation.stockPrevisionnel }} stock previsionnel</v-chip
            >

            <v-chip>{{ speculation.superficie }} superficie</v-chip>

            <v-chip
              >{{ speculation.supNonExploite }} superficie nom exploite</v-chip
            >
          </v-chip-group>
        </v-card-text>

        <v-card-actions v-if="forme == 'false'">
          <v-chip>
            {{ $t('commande.form.stock') }}
            <v-icon class="ml-5" @click="stock--">mdi-minus-circle</v-icon>
            <v-chip class="ma-3">{{ stock }}</v-chip>
            <v-icon @click="stock++">mdi-plus-circle</v-icon>
          </v-chip>
          <v-spacer />
          <v-btn rounded text small>
            {{ $t('commande.panier') }}
          </v-btn>
          <v-btn
            color="secondary"
            rounded
            text
            small
            @click="commandeNow(speculation)"
          >
            {{ $t('commande.bay') }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    forme: {
      type: String,
      default: 'false',
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selection: 1,
      speculation: null,
      stock: 1,
    }
  },

  methods: {
    openDialog(item) {
      this.dialog = true
      this.speculation = item
    },

    async commandeNow(item) {
      if (!this.$auth.user) {
        this.$router.push({ path: this.localePath('/login/connexion') })
      } else {
        const req = {
          produit: item.produit,
          stock: this.stock,
        }
        const commandeRequest = []
        commandeRequest.push(req)
        const result = await this.$swal({
          icon: 'question',
          titleText: this.$t('commande.question'),
          confirmButtonText: this.$t('commoin.actions.yes'),
          cancelButtonText: this.$t('commoin.actions.no'),
          confirmButtonAriaLabel: this.$t('commoin.actions.yes'),
          cancelButtonAriaLabel: this.$t('commoin.actions.no'),
          showCancelButton: true,
          allowOutsideClick: () => {
            const popup = this.$swal.getPopup()
            popup.classList.remove('swal2-show')
            setTimeout(() => {
              popup.classList.add('animate__animated', 'animate__headShake')
            })
            setTimeout(() => {
              popup.classList.remove('animate__animated', 'animate__headShake')
            }, 500)
            return false
          },
        })

        if (result.isConfirmed) {
          await this.$api.saveCommande({ commandeRequests: commandeRequest })
          this.$toast.success(this.$t('commoin.saved'))
          // await this.$auth.logout();
          // this.$store.dispatch("resetState");
          // this.$toast.success(this.$t("logout.loggedOut"));
        } else if (this.$vuetify.breakpoint.smAndDown) {
          // this.$store.dispatch('toggleDrawer', true)
        }
      }
    },
  },
}
</script>
