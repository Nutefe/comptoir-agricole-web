<template>
  <v-container fluid class="ml-0 mr-0">
    <v-row>
      <template v-if="$fetchState.pending">
        <v-col></v-col>
        <v-col cols="12" sm="10" class="mb-3">
          <v-row>
            <v-col
              v-for="n in 12"
              :key="`demande-skeleton-${n}`"
              cols="12"
              sm="6"
              md="4"
            >
              <v-skeleton-loader
                type="demande"
                :types="{
                  demande: 'list-item-avatar-three-line',
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
                :placeholder="$t('demande.search')"
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
              :key="`demande${item.id}`"
              cols="12"
              sm="6"
              md="4"
            >
              <DemandeCard :demande="item" :admin="1" />
            </v-col>
          </v-row>
          <Pagination
            v-if="query"
            :by-id="query"
            store="demande"
            collection="demandes"
            action="searchDemandes"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <Pagination
            v-else
            store="demande"
            collection="demandes"
            action="fetchDemandes"
            :disabled="loading"
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
import DemandeCard from '~/components/card/DemandeCard.vue'
import { debounce, startCase } from '~/helpers/helpers.js'

export default {
  name: 'DemandePage',
  components: { DemandeCard },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('demande.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('demande.table.produit'),
          value: 'produit.designation',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('demande.table.stock'),
          value: 'stock',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('demande.table.prix'),
          value: 'prix',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('demande.table.contact'),
          value: 'contact',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('demande.table.action'),
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
      await this.$store.dispatch('demande/fetchDemandes', 1)
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
      title: this.$t('demande.title'),
    }
  },

  computed: {
    itemsList() {
      if (this.demandes && this.demandes.data) {
        return this.demandes.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.demandes) {
        return this.demandes.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.demandes) {
        const total = this.demandes.total || 0
        const perPage = this.demandes.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },
    countSpeculation() {
      if (this.demandes) {
        const total = this.demandes.total
        return total
      } else {
        return 0
      }
    },
    ...mapState({
      demandes: (state) => state.demande.demandes,
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
          await this.$store.dispatch('demande/searchDemandes', {
            page,
            search: this.query,
          })
        } else {
          await this.$store.dispatch('demande/fetchDemandes', page)
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
