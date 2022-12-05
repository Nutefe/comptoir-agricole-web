<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-list-item three-line @click.stop="showItem(speculation)">
        <v-list-item-avatar tile size="100" color="grey"
          ><v-img
            v-if="speculation.fichiers[0]"
            :src="`${$axios.defaults.baseURL}/downloadFile/${speculation.fichiers[0].name}`"
        /></v-list-item-avatar>
        <v-list-item-content>
          <div class="text-overline mb-4">
            {{ speculation.produit.categorie.libelle }}
          </div>
          <v-list-item-title class="mb-1">
            {{ speculation.produit.designation }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ speculation.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-spacer />
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('commande.bayNow')"
                v-on="on"
                @click.stop="commandeNow(speculation)"
              >
                <v-icon small> mdi-cart </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commande.bayNow') }}
            </span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-card>

    <DetailDialog ref="detailDialog" forme="false" />
  </div>
</template>
<script>
import DetailDialog from '../dialog/DetailDialog.vue'
export default {
  components: { DetailDialog },
  props: {
    speculation: {
      type: Object,
      default: null,
      required: true,
    },
  },

  methods: {
    showItem(item) {
      this.$refs.detailDialog.openDialog(item)
    },

    async commandeNow(item) {
      if (!this.$auth.user) {
        this.$router.push({ path: this.localePath('/login/connexion') })
      } else {
        const req = {
          produit: item.produit,
          stock: 1,
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

    panierNow(item) {},
  },
}
</script>
