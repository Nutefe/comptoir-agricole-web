<template>
  <v-container fluid class="ml-0 mr-0">
    <v-row>
      <template v-if="$fetchState.pending">
        <v-col></v-col>
        <v-col cols="12" sm="10" class="mb-3">
          <v-row>
            <v-col
              v-for="n in 12"
              :key="`speclation-skeleton-${n}`"
              cols="12"
              sm="6"
              md="4"
            >
              <v-skeleton-loader
                type="speculation"
                :types="{
                  speculation: 'list-item-avatar-three-line',
                }"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col></v-col>
      </template>
      <template v-else>
        <v-col></v-col>
        <v-col cols="12" sm="10">
          <v-row class="mb-5 align-middle" align="center" justify="center">
            <v-col cols="12" sm="2"> </v-col>
            <v-col class="col-8">
              <v-text-field
                v-model.lazy.trim="query"
                append-icon="mdi-magnify"
                :placeholder="$t('speculation.search')"
                autocomplete="off"
                type="search"
                clearable
                single-line
                hide-details
                dense
                outlined
                rounded
                @input="filter"
                @click:append="filter"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2"></v-col>
          </v-row>
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
          <Pagination
            v-if="query"
            :by-id="query"
            store="speculationAgregateur"
            collection="authSpeculations"
            action="searchAuthSpeculations"
            :disabled="loading"
            page-mutation="SET_CURRENT_AUTH_PAGE"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <Pagination
            v-else
            store="speculationAgregateur"
            collection="authSpeculations"
            action="fetchAuthSpeculations"
            :disabled="loading"
            page-mutation="SET_CURRENT_AUTH_PAGE"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />
        </v-col>
        <v-col></v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SpeculationCard from '~/components/card/SpeculationCard.vue'
import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'ProduitPage',
  components: { SpeculationCard },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('speculation.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('speculation.table.produit'),
          value: 'produit.designation',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('speculation.table.superficie'),
          value: 'superficie',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('speculation.table.supNonExploite'),
          value: 'supNonExploite',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('speculation.table.stockSpontane'),
          value: 'stockSpontane',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('speculation.table.stockPrevisionnel'),
          value: 'stockPrevisionnel',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('speculation.table.action'),
          value: 'action',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          sortable: false,
          width: 150,
        },
      ],
    }
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch(
        'speculationAgregateur/fetchAuthSpeculations',
        1
      )
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
    itemsList() {
      if (this.speculations && this.speculations.data) {
        return this.speculations.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.speculations) {
        return this.speculations.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.speculations) {
        const total = this.speculations.total || 0
        const perPage = this.speculations.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },
    countSpeculation() {
      if (this.speculations) {
        const total = this.speculations.total
        return total
      } else {
        return 0
      }
    },
    ...mapState({
      speculations: (state) => state.speculationAgregateur.authSpeculations,
    }),
  },

  methods: {
    toggleLoading(value) {
      this.loading = value
    },
    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.id === itemId) + 1
    },

    editItem(item) {
      this.$refs.editFormDialog.openDialog(item)
    },
    startCase(str) {
      if (str) {
        return startCase(str)
      } else {
        return 'n/a'
      }
    },

    async fetchData(page) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch(
            'speculationAgregateur/searchAuthSpeculations',
            {
              page,
              search: this.query,
            }
          )
        } else {
          await this.$store.dispatch(
            'speculationAgregateur/fetchAuthSpeculations',
            page
          )
        }
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
      this.loading = false
    },

    refreshPage(payload) {
      let page = 1
      if (payload === 1) {
        page = this.currentPage
      }
      this.fetchData(page)
    },

    filter: debounce(function () {
      this.fetchData(1)
    }),
  },
}
</script>
