<template>
  <v-container fluid class="py-8 py-sm-10 mt-3">
    <v-row class="mb-0">
      <!-- Loader -->
      <template v-if="$fetchState.pending">
        <v-col cols="12" sm="6" md="4" xl="3" class="text-center">
          <v-skeleton-loader
            type="user"
            :types="{
              user: 'avatar, heading, text, divider, avatar@3, divider, text',
            }"
          />
        </v-col>

        <v-col cols="12" sm="6" md="8" xl="9" class="mb-3">
          <v-row>
            <v-col
              v-for="n in 12"
              :key="`realisation-skeleton-${n}`"
              cols="12"
              md="6"
              xl="4"
            >
              <v-skeleton-loader
                type="commande"
                :types="{
                  realisation:
                    'image, heading, sentences, divider, button, button',
                }"
              />
            </v-col>
          </v-row>
        </v-col>
      </template>

      <!-- Data -->
      <template v-else>
        <!-- Profil -->
        <v-col></v-col>
        <v-col cols="12" sm="10">
          <v-row>
            <v-col cols="12" sm="6" md="4" xl="3" class="text-center mb-3">
              <v-card outlined>
                <div class="text-right ma-3">
                  <v-tooltip left>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        icon
                        small
                        :aria-label="$t('profil.edit.title')"
                        v-on="on"
                      >
                        <v-icon>mdi-pencil-outline</v-icon>
                      </v-btn>
                    </template>

                    <span>
                      {{ $t('profil.edit.title') }}
                    </span>
                  </v-tooltip>
                </div>

                <!-- Avatar -->
                <ProfilePhoto :fullname="fullname" />

                <!-- Fullname -->
                <v-card-title>
                  <span class="mx-auto">{{ fullname }}</span>
                </v-card-title>

                <!-- Job Title -->
                <v-card-subtitle class="text-caption text-uppercase">
                  {{ jobTitle }}
                </v-card-subtitle>

                <v-divider />

                <!-- Social Links -->
                <template v-if="profileLinks.length > 0">
                  <v-card-text>
                    <v-row
                      dense
                      align="center"
                      justify="center"
                      class="py-1 mx-0"
                    >
                      <v-col
                        v-for="(link, index) in profileLinks"
                        :key="`${index}-profile-link`"
                        cols="3"
                      >
                        <v-tooltip bottom>
                          <template #activator="{ on, attrs }">
                            <v-hover v-slot="{ hover }">
                              <a
                                v-bind="attrs"
                                class="profile-link-icon"
                                :style="{
                                  backgroundColor: hover
                                    ? '#9e9e9e'
                                    : link.color,
                                }"
                                :aria-label="link.label"
                                :href="link.url"
                                target="_blank"
                                v-on="on"
                              >
                                <v-icon size="20" dark>{{ link.icon }}</v-icon>
                              </a>
                            </v-hover>
                          </template>

                          <span v-text="link.label" />
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-divider />
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" sm="8" class="mb-3">
              <v-row>
                <v-col
                  v-for="item in itemsList"
                  :key="`commande${item.commande.id}`"
                  cols="12"
                  sm="6"
                >
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-avatar tile size="100" color="grey"
                        ><v-img
                          v-if="item.produits"
                          :src="`${$axios.defaults.baseURL}/downloadFile/${item.produits[0].fichier.name}`"
                      /></v-list-item-avatar>
                      <v-list-item-content>
                        <div class="text-overline mb-4">
                          {{ item.produits[0].categorie.libelle }}
                        </div>
                        <v-list-item-title class="mb-1">
                          {{ item.produits[0].designation }}
                        </v-list-item-title>
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
                              :aria-label="$t('commande.annuler1')"
                              v-on="on"
                              @click.stop="enableItem(item)"
                            >
                              <v-icon
                                v-if="item.commande.status"
                                color="secondary"
                                small
                              >
                                mdi-check-circle
                              </v-icon>
                              <v-icon v-else color="red" small>
                                mdi-minus-circle
                              </v-icon>
                            </v-btn>
                          </template>
                          <span v-if="item.commande.status">
                            {{ $t('commande.enable') }}
                          </span>
                          <span v-else>
                            {{ $t('commande.annuler1') }}
                          </span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col></v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { capitalize, formatPhone, startCase } from '~/helpers/helpers.js'
import ProfilePhoto from '~/components/page/profil/ProfilePhoto.vue'
// import ProfileEdit from '~/components/page/profil/ProfileEdit.vue'
// import RealisationCreate from '~/components/page/realisation/RealisationCreate.vue'

export default {
  components: {
    ProfilePhoto,
    // ProfileEdit,
    // RealisationCreate,
  },

  middleware: 'auth',
  data() {
    return {
      
    }
  },
  async fetch() {
    try {
      await Promise.all([
        // this.$store.dispatch('user/fetchAllUserConnect'),
        this.$store.dispatch('commandeUserConnect/fetchCommandes', 1),
      ])
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
  },

  computed: {
    fullname() {
      if (this.$auth.user) {
        const title = `${this.$auth.user.username}`
        return startCase(title)
      } else {
        return ''
      }
    },
    jobTitle() {
      if (this.$auth.user) {
        return capitalize(this.$auth.user.role.libelle)
      } else {
        return ''
      }
    },
    profileLinks() {
      const links = []

      if (this.$auth.user) {
        links.push({
          icon: 'mdi-phone',
          color: '#1A73E8',
          url: `tel:+228${this.$auth.user.telephone}`,
          label: `+228 ${formatPhone(this.$auth.user.telephone)}`,
        })
      }

      return links
    },
    itemsList() {
      if (this.commandes && this.commandes.data) {
        return this.commandes.data
      } else {
        return []
      }
    },
    ...mapState({
      commandes: (state) => state.commandeUserConnect.commandes,
    }),
  },
  methods: {
    openProfileEditDialog() {
      this.$refs.profileEditDialog.openDialog()
    },
    async fetchData(page) {
      try {
        await this.$store.dispatch('commadeUserConnect/fetchCommandes', page)
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
    },
    refreshPage(payload) {
      let page = 1
      if (payload === 1) {
        page = this.currentPage
      }
      this.fetchData(page)
    },
  },
}
</script>
