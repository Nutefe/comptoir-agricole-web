<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      persistent
      scrollable
      max-width="600"
    >
      <v-card :disabled="loading" :loading="loading">
        <v-card-title class="px-3 px-md-5 py-2 py-md-3">
          <v-row align="center">
            <v-col cols="9">
              <span class="text-h6 text-md-h5 font-weight-regular">
                {{ $t('produit.edit') }}
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
              <v-autocomplete
                v-model.trim.lazy="form.categorie"
                :items="matchedCategories"
                item-text="libelle"
                item-value="id"
                autocomplete="off"
                :label="$t('produit.form.categorie')"
                return-object
                :error-messages="categorieErrors"
                @input="$v.form.categorie.$touch()"
                @blur="$v.form.categorie.$touch()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="form.designation"
                autofocus
                :label="$t('produit.form.designation')"
                autocomplete="off"
                :maxlength="$v.form.designation.$params.maxLength.max"
                :error-messages="designationErrors"
                @input="$v.form.designation.$touch()"
                @blur="$v.form.designation.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="mb-2">
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
import { mapState } from 'vuex'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
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
        designation: '',
        categorie: null,
      },
      form: {
        designation: '',
        categorie: null,
      },
      itemImages: [],
      imagesPicked: {
        valid: false,
        count: 0,
      },
    }
  },
  validations: {
    form: {
      designation: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      categorie: {
        required,
      },
    },
  },
  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('categorie/fetchAllCategories')
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
      const isFormEdited = !isEqual(this.selectedItem, this.form)
        ? this.imagesPicked.count !== 0
        : false

      return (
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        (this.imagesPicked.valid || isFormEdited)
      )
    },
    designationErrors() {
      const errors = []

      if (!this.$v.form.designation.$dirty) return errors

      !this.$v.form.designation.required &&
        errors.push(this.$t('validations.designation.required'))

      !this.$v.form.designation.minLength &&
        errors.push(
          this.$t('validations.designation.min', {
            length: this.$v.form.designation.$params.minLength.min,
          })
        )

      !this.$v.form.designation.maxLength &&
        errors.push(
          this.$t('validations.designation.max', {
            length: this.$v.form.designation.$params.maxLength.max,
          })
        )

      return errors
    },
    categorieErrors() {
      const errors = []

      if (!this.$v.form.categorie.$dirty) return errors

      !this.$v.form.categorie.required &&
        errors.push(this.$t('validations.categorie.required'))

      return errors
    },

    matchedCategories() {
      return this.categories.map((categorie) => {
        const categories = categorie.libelle
        return Object.assign({}, categorie, { categories })
      })
    },

    ...mapState({
      categories: (state) => state.categorie.allCategories,
    }),
  },
  methods: {
    openDialog(item) {
      this.id = item.id
      this.form = {
        designation: item.designation,
        categorie: item.categorie,
      }
      this.selectedItem = Object.assign({}, this.form)

      if(item.fichier){
      const img = {}
            img.id = item.fichier.id
            img.name = `${this.$axios.defaults.baseURL}/downloadFile/${item.fichier.name}`

            this.itemImages.push(img)
      } else{
        this.itemImages=[]

      }
      this.imagesPicked.count = this.itemImages.length

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$v.form.$reset()
      this.id = null
      this.form = {
        designation: '',
        categorie: null,
      }
      this.selectedItem = {
        designation: '',
        categorie: null,
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
      this.$v.form.$touch()

      const imagesObject = this.$refs.dropzone.images()

      if (this.isFormValid && imagesObject) {
        this.loading = true

        try {
          if (imagesObject.images.length !== 0) {
            const formData = new FormData()

            formData.append('designation', this.form.designation)
            formData.append('categorie', this.form.categorie.id)
            // formData.append('ids', JSON.stringify(imagesObject.ids))

            const compressedImages = []
            for (const img of imagesObject.images) {
              const blob = await compressImage(img)
              compressedImages.push(blob)
            }

            compressedImages.forEach((img) =>
              formData.append('image', img, img.name)
            )

            await this.$api.updateProduit(formData, this.id)
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
