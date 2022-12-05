<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-list-item three-line @click.stop="showItem(demande)">
        <v-list-item-avatar tile size="100" color="grey"
          ><v-img
            v-if="demande.fichiers[0]"
            :src="`${$axios.defaults.baseURL}/downloadFile/${demande.fichiers[0].name}`"
        /></v-list-item-avatar>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ demande.produit.categorie.libelle }}
          </div>
          <v-list-item-title class="mb-1">
            {{ demande.produit.designation }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ demande.description }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action v-if="isAdmin && admin == 1">
          <v-spacer />
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('demande.enable')"
                v-on="on"
                @click.stop="enableItem(demande)"
              >
                <v-icon small> mdi-cart </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('demande.enable') }}
            </span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-card>

    <DetailDemandeDialog ref="detailDialog" forme="false" />
  </div>
</template>
<script>
import DetailDemandeDialog from '../dialog/DetailDemandeDialog.vue'
import { mixinRoles } from '~/mixins/mixinRoles.js'

export default {
  components: { DetailDemandeDialog },
    mixins: [mixinRoles],

  props: {
    demande: {
      type: Object,
      default: null,
      required: true,
    },
    admin: {
      type: Number,
      default: 0,
      required: false,
    },
  },

  methods: {
    showItem(item) {
      this.$refs.detailDialog.openDialog(item)
    },

    async enableItem(item) {
      if (this.$vuetify.breakpoint.mobile) {
        this.$store.dispatch('toggleDrawer', false)
      }

      const result = await this.$swal({
        icon: 'question',
        titleText: this.$t('speculation.question'),
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
        this.$store.dispatch('demande/enableDemandes', item.id)
        this.fetchData(1)
        this.$toast.success(this.$t('commoin.valide'))
      } else if (this.$vuetify.breakpoint.smAndDown) {
        this.$store.dispatch('toggleDrawer', true)
      }
    },
  },
}
</script>
