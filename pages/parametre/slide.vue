<template>
  <v-container fluid class="ml-0 mr-0">
    <v-row>
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
              :key="`slider${item.id}`"
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
                      {{ item.libelle }}
                    </div>
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
                          :aria-label="$t('slider.disable')"
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
                        {{ $t('slider.disable') }}
                      </span>
                      <span v-else>
                        {{ $t('slider.enable') }}
                      </span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>

          <v-divider v-if="isDividerVisible" />
          <Pagination
            v-if="query"
            :by-id="query"
            store="slider"
            collection="sliders"
            action="searchSliders"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />

          <Pagination
            v-else
            store="slider"
            collection="sliders"
            action="fetchSliders"
            :disabled="loading"
            class="mb-2 mt-2"
            align="right"
            @loading="toggleLoading"
          />
        <SliderCreate @refreshPage="refreshPage" />
        <SliderEdit ref="editFormDialog" @refreshPage="refreshPage" />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { debounce, startCase } from '~/helpers/helpers.js'
import SliderCreate from '~/components/page/slider/SliderCreate.vue'
import SliderEdit from '~/components/page/slider/SliderEdit.vue'

export default {
  name: 'SliderPage',

  components: {
    SliderCreate,
    SliderEdit,
  },

  layout: 'default',

  data() {
    return {
      search: '',
      query: '',
      loading: false,
    }
  },

  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('slider/fetchSliders', 1)
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
      title: this.$t('slider.title'),
    }
  },

  computed: {
    itemsList() {
      if (this.sliders && this.sliders.data) {
        return this.sliders.data
      } else {
        return []
      }
    },

    currentPage() {
      if (this.sliders) {
        return this.sliders.current_page || 1
      } else {
        return 1
      }
    },

    isDividerVisible() {
      if (this.sliders) {
        const total = this.sliders.total || 0
        const perPage = this.sliders.per_page || 0
        return total > perPage
      } else {
        return false
      }
    },

    ...mapState({
      sliders: (state) => state.slider.sliders,
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

    async enableItem(item) {
      if (this.$vuetify.breakpoint.mobile) {
        this.$store.dispatch('toggleDrawer', false)
      }

      const result = await this.$swal({
        icon: 'question',
        titleText: this.$t('slider.question'),
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
        this.$store.dispatch('slider/enableSlider', item.id)
        this.fetchData(1)
        this.$toast.success(this.$t('commoin.valide'))
      } else if (this.$vuetify.breakpoint.smAndDown) {
        this.$store.dispatch('toggleDrawer', true)
      }
    },


    async fetchData(page) {
      this.loading = true
      try {
        if (this.query) {
          await this.$store.dispatch('slider/searchSliders', {
            page,
            search: this.query,
          })
        } else {
          await this.$store.dispatch('slider/fetchSliders', page)
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
