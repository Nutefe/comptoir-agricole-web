<template>
  <div>
    <v-tooltip left>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          elevation="10"
          dark
          fixed
          bottom
          right
          fab
          :class="isSm"
          :aria-label="$t('slider.new')"
          @click.stop="openDialog"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <span>
        {{ $t('slider.new') }}
      </span>
    </v-tooltip>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        persistent
        scrollable
        max-width="700"
      >
        <v-card :disabled="loading" :loading="loading">
          <v-card-title class="px-3 px-md-5 py-2 py-md-3">
            <v-row align="center">
              <v-col cols="9">
                <span class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('slider.new') }}
                </span>
              </v-col>

              <v-spacer />

              <v-col cols="auto">
                <v-btn
                  icon
                  large
                  :aria-label="$t('commoin.actions.close')"
                  @click.stop="closeDialog"
                >
                  <v-icon large>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-divider />

          <v-card-text class="px-3 px-md-5 pt-3">
            <v-row>
              
              <v-col cols="12">
                <v-text-field
                  v-model.trim="form.libelle"
                  autofocus
                  :label="$t('slider.form.libelle')"
                  autocomplete="off"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="mb-2">
                <Dropzone
                  ref="dropzone"
                  :max-file-count="countImg"
                  @imagesPicked="toggleImages"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions class="py-4">
            <v-row
              align="center"
              justify="center"
              justify-sm="end"
              class="px-2 px-md-4 py-3"
            >
              <v-btn class="mr-3" text @click="closeDialog">
                {{ $t('commoin.actions.cancel') }}
              </v-btn>

              <v-btn
                :disabled="!isFormValid"
                color="primary"
                depressed
                @click="submitForm"
              >
                {{ $t('commoin.actions.save') }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { compressImage } from '~/helpers/helpers.js'
import Dropzone from '~/components/Dropzone.vue'
import { mixinRoles } from '~/mixins/mixinRoles.js'

export default {
  components: {
    Dropzone,
  },
  mixins: [mixinRoles],

  data() {
    return {
      dialog: false,
      loading: false,
      countImg: 1,
      form: {
        libelle: '',
      },
      imagesPicked: {
        valid: false,
        count: 0,
      },
    }
  },
  
  async fetch() {
    this.loading = true
    try {
      await Promise.all([this.$store.dispatch('produit/fetchAuthProduits')])
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
    this.loading = false
  },
  computed: {
    isFormValid() {
      return (
        this.imagesPicked.valid &&
        this.imagesPicked.count !== 0
      )
    },

    isSm() {
      if (!this.$vuetify.breakpoint.smAndDown) {
        return 'fab-btn'
      } else {
        return 'fab-btn1'
      }
    },

  },
  methods: {
    openDialog() {
        this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.form = {
        libelle: '',
      }
      this.$refs.dropzone.reset()
      this.imagesPicked = {
        valid: false,
        count: 0,
      }
      this.loading = false
    },
    toggleImages(payload) {
      this.imagesPicked = {
        valid: payload.valid,
        count: payload.count,
      }
    },
    async submitForm() {

      const imagesObject = this.$refs.dropzone.images()

      if (
        this.isFormValid &&
        imagesObject &&
        imagesObject.images.length !== 0
      ) {
        this.loading = true

        try {
          const formData = new FormData()
          formData.append('libelle', this.form.libelle)

          const compressedImages = []
          for (const img of imagesObject.images) {
            const blob = await compressImage(img)
            compressedImages.push(blob)
          }

          compressedImages.forEach((img) =>
            formData.append('images', img, img.name)
          )

          await this.$api.saveSlider(formData)
          this.$emit('refreshPage', 0)

          this.closeDialog()
          this.$toast.success(this.$t('commoin.saved'))
        } catch (err) {
          this.loading = false

          if (err.response) {
            this.$toast.error(this.$t('commoin.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
      }
    },
  },
}
</script>
