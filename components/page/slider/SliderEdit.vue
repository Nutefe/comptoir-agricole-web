<template>
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
                {{ $t('demande.edit') }}
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
                <!-- <Dropzone
                  ref="dropzone"
                  :max-file-count="countImg"
                  @imagesPicked="toggleImages"
                /> -->
                <Dropzone
                :key="id"
                ref="dropzone"
                :max-file-count="countImg"
                :initial-old-images="itemImages"
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
</template>

<script>
import { compressImage, isEqual } from '~/helpers/helpers.js'
import Dropzone from '~/components/Dropzone.vue'

export default {
  components: {
    Dropzone,
  },
  data() {
    return {
      dialog: false,
      loading: false,
      countImg: 1,
      id: null,
      selectedItem: {
                libelle: '',
      },
      form: {
        libelle: '',
      },
      itemImages: [],
      imagesPicked: {
        valid: false,
        count: 0,
      },
    }
  },
  
  computed: {
    isFormValid() {
      const isFormEdited = !isEqual(this.selectedItem, this.form)
        ? this.imagesPicked.count !== 0
        : false

      return (
        (this.imagesPicked.valid || isFormEdited)
      )
    },
  },
  methods: {
    openDialog(item) {
      this.id = item.id
      this.form = {
        libelle: item.libelle || '',
      }
      this.selectedItem = Object.assign({}, this.form)
      if (item.fichiers.length > 0) {
        item.fichiers.forEach((el) => {
          const img = {}
          img.id = el.id
          img.name = `${this.$axios.defaults.baseURL}/downloadFile/${el.name}`
          this.itemImages.push(img)
        })
      } else {
        this.itemImages = []
      }
      this.imagesPicked.count = this.itemImages.length

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.id = null
      this.form = {
        libelle: '',
      }
      this.selectedItem = {
        libelle: '',
      }
      this.itemImages = []
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

      if (this.isFormValid && imagesObject) {
        this.loading = true

        try {
          if (imagesObject.images.length !== 0) {
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

            await this.$api.updateSlider(formData, this.id)
          }
          // else {
          //   const ids = imagesObject.ids.map((elm) => elm.id)

          //   await this.$api.updateproduitWithoutImages(this.id, {
          //     libelle: this.form.libelle,
          //     description: this.form.description,
          //     ids,
          //   })
          // }

          this.$emit('refreshPage')

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
