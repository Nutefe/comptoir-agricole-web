<template>
  <v-container fluid class="ml-0 mr-0">
    <v-row>
      <v-col></v-col>
      <v-col cols="12" sm="10">
        <PageTitle :title="$t('categorie.title')" />
        <v-card class="mt-10 mb-10 pb-3 justify-space-around">
          <v-row class="mb-5 align-middle">
            <v-col class="col-4"> </v-col>
            <v-col class="col-8">
              <v-text-field
                v-model.lazy.trim="query"
                append-icon="mdi-magnify"
                :placeholder="$t('categorie.search')"
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
            store="categorie"
            collection="categories"
            action="searchCategories"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <Pagination
            v-else
            store="categorie"
            collection="categories"
            action="fetchCategories"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />
        </v-card>
        <ModePaiementCreate @refreshPage="refreshPage" />
        <ModePaiementEdit ref="editFormDialog" @refreshPage="refreshPage" />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, startCase } from '~/helpers/helpers.js'
import ModePaiementCreate from '~/components/page/modePaiement/ModePaiementCreate.vue'
import ModePaiementEdit from '~/components/page/modePaiement/ModePaiementEdit.vue'
import PageTitle from '~/components/PageTitle.vue'

export default {
  name: 'ModePaiementPage',

  components: {
    ModePaiementCreate,
    ModePaiementEdit,
    PageTitle,
  },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
      headers: [
        {
          text: this.$t('modePaiement.table.num'),
          value: 'num',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
          width: 100,
        },
        {
          text: this.$t('modePaiement.table.libelle'),
          value: 'libelle',
          class: 'text-subtitle-2 text-uppercase font-weight-bold',
          cellClass: 'py-3',
        },
        {
          text: this.$t('modePaiement.table.action'),
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
      await this.$store.dispatch('modePaiement/fetchModes', 1)
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
      title: this.$t('modePaiement.title'),
    }
  },

  computed: {
    itemsList() {
      if (this.modes && this.modes.data) {
        return this.modes.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.modes) {
        return this.modes.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.modes) {
        const total = this.modes.total || 0
        const perPage = this.modes.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      modes: (state) => state.modePaiement.modes,
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
          await this.$store.dispatch('modePaiement/searchModes', {
            page,
            search: this.query,
          })
        } else {
          await this.$store.dispatch('modePaiement/fetchModes', page)
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
