<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10">
      <v-container fluid>
        <div>
          <v-card class="py-3 px-3" elevation="1">
            <v-row align="center" justify="center" dense>
              <v-col
                v-show="!$vuetify.breakpoint.mdAndDown"
                cols="12"
                :sm="isSm"
              >
                <CategorieCard :categories="topCategories" />
              </v-col>
              <v-col cols="12" :sm="isSmC">
                <v-carousel
                  cycle
                  height="450"
                  hide-delimiter-background
                  :show-arrows="false"
                  delimiter-icon="mdi-minus"
                  dark
                >
                  <v-carousel-item
                    v-for="slide in sliders"
                    :key="`carousel-item-${slide.id}`"
                  >
                    <v-img
                      class="fill-height"
                      :src="`${$axios.defaults.baseURL}/downloadFile/${slide.fichiers[0].name}`"
                    >
                      <v-row class="fill-height" align="center">
                        <v-card
                          color="white"
                          flat
                          max-width="300"
                          class="card-carousel text-center ma-15 py-5 px-2"
                        >
                          <p class="pt-3">
                            {{ $t('connexion.msg2') }}
                          </p>
                          <div class="mx-3 mt-10">
                            <v-btn
                              rounded
                              color="black"
                              class="btn-connexion"
                              dark
                              small
                              outlined
                              block
                              nuxt
                              to="/login/siginUpExp"
                            >
                              {{ $t('connexion.signUpExp') }}
                            </v-btn>
                          </div>
                        </v-card>
                      </v-row>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col v-show="!$vuetify.breakpoint.lgAndDown && !$auth.user" cols="12" sm="2">
                <LoginCard />
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div class="my-15">
          <v-row>
            <v-col
              v-for="item in itemsList"
              :key="`speculetion${item.id}`"
              cols="12"
              sm="6"
              md="4"
            >
              <SpeculationCard :speculation="item" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import CategorieCard from '~/components/card/CategorieCard.vue'
import LoginCard from '~/components/page/login/LoginCard.vue'
import SpeculationCard from '~/components/card/SpeculationCard.vue'
export default {
  name: 'IndexPage',
  components: { LoginCard, CategorieCard, SpeculationCard },

  data() {
    return {
      selectedItem: 1,
    }
  },

  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        this.$store.dispatch('categorie/fetchTopCategories'),
        this.$store.dispatch('produit/fetchTopProduits'),
        this.$store.dispatch('slider/fetchAuthSliders'),
        this.$store.dispatch('speculationAgregateur/fetchAuthSpeculations', 1),
      ])
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
    this.loading = false
  },

  head() {
    return {
      title: this.$t('speculation.title'),
    }
  },

  computed: {
    isSm() {
      if (this.$vuetify.breakpoint.lgAndDown || this.$vuetify.breakpoint.lgAndDown) {
        return 3
      } else {
        return 2
      }
    },

    isSmC() {
      if (this.$auth.user || this.$vuetify.breakpoint.lgAndDown) {
        return 9
      } else {
        return 8
      }
    },

    itemsList() {
      if (this.speculations && this.speculations.data) {
        return this.speculations.data
      } else {
        return []
      }
    },

    // currentPage() {
    //   if (this.speculations) {
    //     return this.speculations.current_page || 1
    //   } else {
    //     return 1
    //   }
    // },

    // isDividerVisible() {
    //   if (this.speculations) {
    //     const total = this.speculations.total || 0
    //     const perPage = this.speculations.per_page || 0
    //     return total > perPage
    //   } else {
    //     return false
    //   }
    // },
    // countSpeculation() {
    //   if (this.speculations) {
    //     const total = this.speculations.total
    //     return total
    //   } else {
    //     return 0
    //   }
    // },

    ...mapState({
      topCategories: (state) => state.categorie.topCategories,
      topProduits: (state) => state.produit.topProduits,
      speculations: (state) => state.speculationAgregateur.authSpeculations,
      sliders: (state) => state.slider.authSliders,
    }),
  },

  methods: {},
}
</script>
