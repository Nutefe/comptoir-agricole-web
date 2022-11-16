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
          <!-- <PageTitle :title="$t('speculation.title')" /> -->
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
              <v-card class="mx-auto" outlined>
                <v-list-item three-line @click="showItem(item)">
                  <v-list-item-avatar tile size="100" color="grey"
                    ><v-img
                      v-if="item.fichiers[0]"
                      :src="`${$axios.defaults.baseURL}/downloadFile/${item.fichiers[0].name}`"
                  /></v-list-item-avatar>
                  <v-list-item-content>
                    <div class="text-overline mb-4">
                      {{ item.produit.categorie.libelle }}
                    </div>
                    <v-list-item-title class="mb-1">
                      {{ item.produit.designation }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.description }}
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
                    <v-tooltip top>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          class="mr-3"
                          small
                          icon
                          :aria-label="$t('speculation.disable')"
                          v-on="on"
                          @click.stop="enableItem(item)"
                        >
                          <v-icon v-if="item.valide" color="secondary" small>
                            mdi-check-circle
                          </v-icon>
                          <v-icon v-else color="red" small>
                            mdi-check-circle
                          </v-icon>
                        </v-btn>
                      </template>
                      <span v-if="item.valide">
                        {{ $t('speculation.disable') }}
                      </span>
                      <span v-else>
                        {{ $t('speculation.enable') }}
                      </span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-divider v-if="isDividerVisible" /> -->
          <Pagination
            v-if="query"
            :by-id="query"
            store="speculationUserConnect"
            collection="speculations"
            action="searchSpeculations"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <Pagination
            v-else
            store="speculationUserConnect"
            collection="speculations"
            action="fetchSpeculations"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <template v-if="isAdmin || isAgregateur">
            <SpeAgregateurCreate @refreshPage="refreshPage" />
            <SpeAgregateurEdit
              ref="editFormDialog"
              @refreshPage="refreshPage"
            />
          </template>
          <template v-else>
            <SpeExploitantCreate @refreshPage="refreshPage" />
            <SpeExploitantEdit
              ref="editFormDialog"
              @refreshPage="refreshPage"
            />
          </template>
        </v-col>
        <v-col></v-col>
      </template>
    </v-row>
    <DetailDialog ref="detailDialog" forme="true" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, startCase } from '~/helpers/helpers.js'
import { mixinRoles } from '~/mixins/mixinRoles'
import SpeAgregateurCreate from '~/components/page/speculation/agregateur/SpeAgregateurCreate.vue'
import SpeAgregateurEdit from '~/components/page/speculation/agregateur/SpeAgregateurEdit.vue'
import SpeExploitantCreate from '~/components/page/speculation/exploitant/SpeExploitantCreate.vue'
import SpeExploitantEdit from '~/components/page/speculation/exploitant/SpeExploitantEdit.vue'
import DetailDialog from '~/components/dialog/DetailDialog.vue'

export default {
  name: 'ProduitPage',

  components: {
    // PageTitle,
    SpeAgregateurCreate,
    SpeAgregateurEdit,
    SpeExploitantCreate,
    SpeExploitantEdit,
    DetailDialog,
  },

  mixins: [mixinRoles],

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
      await this.$store.dispatch('speculationUserConnect/fetchSpeculations', 1)
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
      // console.log(this.speculations)
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
      speculations: (state) => state.speculationUserConnect.speculations,
    }),
  },

  methods: {
     showItem(item) {
      this.$refs.detailDialog.openDialog(item)
    },
    toggleLoading(value) {
      this.loading = value
    },
    itemPosition(itemId) {
      return this.itemsList.findIndex((elm) => elm.id === itemId) + 1
    },
    editItem(item) {
      this.$refs.editFormDialog.openDialog(item)
    },
    // enableItem(item) {
    //   this.$refs.editFormDialog.openDialog(item)
    // },

    async enableItem(item) {
      if (this.$vuetify.breakpoint.mobile) {
        this.$store.dispatch('toggleDrawer', false)
      }

      const result = await this.$swal({
        icon: 'question',
        titleText: this.$t('speculation.question'),
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
        this.$store.dispatch('speculation/enableSpeculations', item.id)
        this.fetchData(1)
        this.$toast.success(this.$t('commoin.valide'))
      } else if (this.$vuetify.breakpoint.smAndDown) {
        this.$store.dispatch('toggleDrawer', true)
      }
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
            'speculationUserConnect/searchSpeculations',
            {
              page,
              search: this.query,
            }
          )
        } else {
          await this.$store.dispatch(
            'speculationUserConnect/fetchSpeculations',
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
