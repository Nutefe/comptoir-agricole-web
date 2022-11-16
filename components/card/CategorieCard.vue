<template>
  <div>
    <v-card id="categorie" class="mx-auto mt-0" min-height="400" elevation="0">
      <v-list rounded dense>
        <v-subheader class="category-title text-uppercase font-weight">{{
          $t('categorie.title')
        }}</v-subheader>
        <v-divider />
        <v-list-item-group color="primary" class="mt-2">
          <v-list-item
            v-for="item in categories"
            :key="item.id"
            :title="item.libelle"
            @click="fetchSpeculationCat(item.id)"
          >
            <v-list-item-icon v-if="item.fichier">
              <v-avatar size="25"
                ><v-img
                  :src="`${$axios.defaults.baseURL}/downloadFile/${item.fichier.name}`"
              /></v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="category">
                {{ item.libelle }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="category">Autres</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <!-- <v-btn
              v-if="isAdmin"
              id="admin"
              outlined
              rounded
              class="secondary--text mr-1"
              active-class="green--text"
            >
              {{ adminRoutes.title }}
            </v-btn> -->
          <v-menu
            attach="#categorie"
            offset-x
            right
            transition="slide-x-transition"
            active-class="primary--text"
            rounded="xl"
            content-class="elevation-4"
            nudge-bottom="15"
            nudge-right="15"
            open-on-hover
          >
            <template #activator="{ on, attrs }">
              <v-list-item
                class="text-center"
                v-bind="attrs"
                title="Autres"
                v-on="on"
              >
                <v-icon>mdi-filter-menu </v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('categorie.all') }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon small> mdi-chevron-right </v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>

            <v-card>
              <v-list outlined nav dense>
                <v-list-item
                  v-for="subItem in categories"
                  :key="`subItem-${subItem.libelle}`"
                  color="primary"
                  nuxt
                  @click="fetchSpeculationCat(subItem.id)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ subItem.libelle }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <!-- <v-list>
              <template v-for="item in adminRoutes.paths">
                <v-menu
                  :key="`item-${item.title}`"
                  transition="slide-x-transition"
                  open-on-hover
                  offset-x
                  rounded="xl"
                  content-class="elevation-4"
                  nudge-right="5"
                >
                </v-menu>
              </template>
            </v-list> -->
          </v-menu>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      default: null,
      required: true,
    },
  },

  methods: {
    async fetchSpeculationCat(ids) {
      this.loading = true
      try {
        await this.$store.dispatch(
          'speculationAgregateur/fetchAuthSpeculationsCat',
          { id: ids, page: 1 }
        )
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
      this.loading = false
    },
  },
}
</script>
