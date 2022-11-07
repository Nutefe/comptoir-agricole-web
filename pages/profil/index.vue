<template>
  <v-container class="py-8 py-sm-10 mt-3">
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
                type="realisation"
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
                    @click.stop="openProfileEditDialog"
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
                <v-row dense align="center" justify="center" class="py-1 mx-0">
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
                              backgroundColor: hover ? '#9e9e9e' : link.color,
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

            <!-- Realisations count -->
            <v-card-text>
              <v-row dense align="center" justify="center" class="mx-0">
                <v-col cols="12">
                  <v-icon>mdi-crown-outline</v-icon>
                </v-col>

                <v-col cols="12">
                  <span class="text-body-1">
                    {{ realisationsCount }}
                  </span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <ProfileEdit ref="profileEditDialog" />
    <!-- <RealisationCreate @refreshPage="refreshPage" /> -->
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { capitalize, formatPhone, startCase } from '~/helpers/helpers.js'
import ProfilePhoto from '~/components/page/profil/ProfilePhoto.vue'
import ProfileEdit from '~/components/page/profil/ProfileEdit.vue'
// import RealisationCreate from '~/components/page/realisation/RealisationCreate.vue'

export default {
  components: {
    ProfilePhoto,
    ProfileEdit,
    // RealisationCreate,
  },

  middleware: 'auth',
  data() {
    return {
      realisationsCount: 0,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('profile/me', 1)
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
  },
  head() {
    return {
      title: this.fullname,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
  computed: {
    description() {
      return this.$t('descriptions.realisations', {
        nom: this.fullname,
      })
    },
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

        if (this.$auth.user.facebook) {
          links.push({
            icon: 'mdi-facebook',
            color: '#1877F2',
            url: this.$auth.user.facebook,
            label: 'Facebook',
          })
        }

        if (this.$auth.user.tweeter) {
          links.push({
            icon: 'mdi-twitter',
            color: '#1DA1F2',
            url: this.$auth.user.tweeter,
            label: 'Twitter',
          })
        }

        if (this.$auth.user.whatsapp) {
          links.push({
            icon: 'mdi-whatsapp',
            color: '#25D366',
            url: `https://api.whatsapp.com/send?phone=228${this.$auth.user.whatsapp}`,
            label: `+228 ${formatPhone(this.$auth.user.whatsapp)}`,
          })
        }
      }

      return links
    },
    // realisationsCount() {
    //     if (this.realisationsTotal < 100 * 100) {
    //         return this.$tc("realisation.count", this.realisationsTotal);
    //     } else {
    //         // const count = abbreviateNumber(this.realisationsTotal, 1, {
    //         //     symbols: ["", " K", " M", " G", " T", " P", " E"],
    //         //     padding: false,
    //         // });
    //         return this.$tc("realisation.count", this.realisationsTotal, {
    //             1
    //         });
    //     }
    // },
    realisationsList() {
      return this.realisations?.data || []
    },
    currentPage() {
      return this.realisations?.current_page || 1
    },
    ...mapGetters({
      realisationsTotal: 'profile/realisationsTotal',
    }),
    ...mapState({
      realisations: (state) => state.profile.realisations,
    }),
  },
  //   activated() {
  //     if (this.$fetchState.timestamp <= Date.now() - 5 * 60 * 1000) {
  //       this.$fetch()
  //     }
  //   },
  methods: {
    openProfileEditDialog() {
      this.$refs.profileEditDialog.openDialog()
    },
    async fetchData(page) {
      try {
        await this.$store.dispatch('profile/fetchRealisations', page)
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
