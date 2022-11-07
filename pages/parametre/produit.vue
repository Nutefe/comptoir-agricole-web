<template>
  <v-container fluid class="ml-0 mr-0">
    <v-row>
      <v-col></v-col>
      <v-col cols="12" sm="10">
        <PageTitle :title="$t('produit.title')" />
        <v-card class="mt-10 mb-10 pb-3 justify-space-around">
          <v-row class="mb-5 align-middle">
            <v-col class="col-4"> </v-col>
            <v-col class="col-8">
              <v-text-field
                v-model.lazy.trim="query"
                append-icon="mdi-magnify"
                :placeholder="$t('produit.search')"
                autocomplete="off"
                type="search"
                clearable
                single-line
                hide-details
                dense
                @input="filter"
                @click:append="filter"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="itemsList"
            item-key="id"
            :loading="loading"
            :mobile-breakpoint="960"
            disable-filtering
            disable-pagination
            disable-sort
            hide-default-footer
            :items-per-page="-1"
            :footer-props="{
              itemsPerPageOptions: [],
              showCurrentPage: true,
              showFirstLastPage: true,
            }"
          >
            <template #[`item.num`]="{ item }">
              {{ itemPosition(item.id) }}
            </template>

            <template #[`item.action`]="{ item }">
              <!-- Edit -->
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    class="mr-3"
                    small
                    icon
                    :aria-label="$t('commoin.actions.edit')"
                    v-on="on"
                    @click.stop="editItem(item)"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>
                </template>

                <span>
                  {{ $t('commoin.actions.edit') }}
                </span>
              </v-tooltip>
            </template>
          </v-data-table>

          <v-divider v-if="isDividerVisible" />
          <Pagination
            v-if="query"
            :by-id="query"
            store="produit"
            collection="produits"
            action="searchProduits"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <Pagination
            v-else
            store="produit"
            collection="produits"
            action="fetchProduits"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />
        </v-card>
        <ProduitCreate @refreshPage="refreshPage" />
        <ProduitEdit ref="editFormDialog" @refreshPage="refreshPage" />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, startCase } from '~/helpers/helpers.js'
import PageTitle from '~/components/PageTitle.vue'
import ProduitCreate from '~/components/page/produit/ProduitCreate.vue'
import ProduitEdit from '~/components/page/produit/ProduitEdit.vue'

export default {
  name: 'ProduitPage',

  components: {
    PageTitle,
    ProduitCreate,
    ProduitEdit,
  },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('produit.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('produit.table.designation'),
          value: 'designation',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('produit.table.categorie'),
          value: 'categorie.libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('produit.table.action'),
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
      await this.$store.dispatch('produit/fetchProduits', 1)
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
      title: this.$t('produit.title'),
    }
  },

  computed: {
    itemsList() {
      if (this.produits && this.produits.data) {
        return this.produits.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.produits) {
        return this.produits.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.produits) {
        const total = this.produits.total || 0
        const perPage = this.produits.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      produits: (state) => state.produit.produits,
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
          await this.$store.dispatch('produit/searchProduits', {
            page,
            search: this.query,
          })
        } else {
          await this.$store.dispatch('produit/fetchProduits', page)
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
