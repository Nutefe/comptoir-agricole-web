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
        <!-- <v-list-item-action>
          <v-spacer />
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-3"
                small
                icon
                :aria-label="$t('commoin.actions.edit')"
                v-on="on"
                @click.stop="editItem(speculation)"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
            </template>

            <span>
              {{ $t('commoin.actions.edit') }}
            </span>
          </v-tooltip>
        </v-list-item-action> -->
      </v-list-item>
    </v-card>
    
    <detail-dialog ref="detailDialog" />
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

  }
}
</script>
