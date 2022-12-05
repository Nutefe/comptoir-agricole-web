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
            <v-col cols="6">
              <v-autocomplete
                v-model.trim.lazy="form.produit"
                :items="matchedProduits"
                item-text="designation"
                item-value="id"
                autocomplete="off"
                :label="$t('demande.form.produit')"
                return-object
                :error-messages="produitErrors"
                @input="$v.form.produit.$touch()"
                @blur="$v.form.produit.$touch()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.contact"
                autofocus
                :label="$t('demande.form.contact')"
                autocomplete="off"
                type="number"
                :maxlength="$v.form.contact.$params.maxLength.max"
                :error-messages="contactErrors"
                @input="$v.form.contact.$touch()"
                @blur="$v.form.contact.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.prix"
                autofocus
                :label="$t('demande.form.prix')"
                autocomplete="off"
                type="number"
                :maxlength="$v.form.prix.$params.maxLength.max"
                :error-messages="prixErrors"
                @input="$v.form.prix.$touch()"
                @blur="$v.form.prix.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.stock"
                autofocus
                :label="$t('demande.form.stock')"
                autocomplete="off"
                type="number"
                step="0.01"
                :maxlength="$v.form.stock.$params.maxLength.max"
                :error-messages="stockErrors"
                @input="$v.form.stock.$touch()"
                @blur="$v.form.stock.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model.trim="form.description"
                autofocus
                :label="$t('demande.form.description')"
                autocomplete="off"
              ></v-textarea>
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
        produit: null,
        contact: '',
        prix: '',
        stock: '',
        description: '',
      },
      form: {
        produit: null,
        contact: '',
        prix: '',
        stock: '',
        description: '',
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
      contact: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      prix: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(20),
      },
      stock: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(20),
      },
      description: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      produit: {
        required,
      },
    },
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
      const isFormEdited = !isEqual(this.selectedItem, this.form)
        ? this.imagesPicked.count !== 0
        : false

      return (
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        (this.imagesPicked.valid || isFormEdited)
      )
    },
    contactErrors() {
      const errors = []

      if (!this.$v.form.contact.$dirty) return errors

      !this.$v.form.contact.required &&
        errors.push(this.$t('validations.contact.required'))

      !this.$v.form.contact.minLength &&
        errors.push(
          this.$t('validations.contact.min', {
            length: this.$v.form.contact.$params.minLength.min,
          })
        )

      !this.$v.form.contact.maxLength &&
        errors.push(
          this.$t('validations.contact.max', {
            length: this.$v.form.contact.$params.maxLength.max,
          })
        )

      return errors
    },
    prixErrors() {
      const errors = []

      if (!this.$v.form.prix.$dirty) return errors

      !this.$v.form.prix.required &&
        errors.push(this.$t('validations.prix.required'))

      !this.$v.form.prix.minLength &&
        errors.push(
          this.$t('validations.prix.min', {
            length: this.$v.form.prix.$params.minLength.min,
          })
        )

      !this.$v.form.prix.maxLength &&
        errors.push(
          this.$t('validations.prix.max', {
            length: this.$v.form.prix.$params.maxLength.max,
          })
        )

      return errors
    },
    stockErrors() {
      const errors = []

      if (!this.$v.form.stock.$dirty) return errors

      !this.$v.form.stock.required &&
        errors.push(this.$t('validations.stock.required'))

      !this.$v.form.stock.minLength &&
        errors.push(
          this.$t('validations.stock.min', {
            length: this.$v.form.stock.$params.minLength.min,
          })
        )

      !this.$v.form.stock.maxLength &&
        errors.push(
          this.$t('validations.stock.max', {
            length: this.$v.form.stock.$params.maxLength.max,
          })
        )

      return errors
    },
    descriptionErrors() {
      const errors = []

      if (!this.$v.form.description.$dirty) return errors

      !this.$v.form.description.required &&
        errors.push(this.$t('validations.description.required'))

      !this.$v.form.description.minLength &&
        errors.push(
          this.$t('validations.description.min', {
            length: this.$v.form.description.$params.minLength.min,
          })
        )

      !this.$v.form.description.maxLength &&
        errors.push(
          this.$t('validations.description.max', {
            length: this.$v.form.description.$params.maxLength.max,
          })
        )

      return errors
    },
    produitErrors() {
      const errors = []

      if (!this.$v.form.produit.$dirty) return errors

      !this.$v.form.produit.required &&
        errors.push(this.$t('validations.produit.required'))

      return errors
    },

    matchedProduits() {
      return this.produits.map((produit) => {
        const produits = produit.libelle
        return Object.assign({}, produit, { produits })
      })
    },

    ...mapState({
      produits: (state) => state.produit.authProduits,
    }),
  },
  methods: {
    openDialog(item) {
      // console.log(item)
      this.id = item.id
      this.form = {
        produit: item.produit || null,
        contact: item.contact || 0,
        prix: item.prix || 0,
        stock: item.stock || 0,
        description: item.description || '',
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
      this.$v.form.$reset()
      this.id = null
      this.form = {
        produit: null,
        contact: '',
        prix: '',
        stock: '',
        description: '',
      }
      this.selectedItem = {
        produit: null,
        contact: '',
        prix: '',
        stock: '',
        description: '',
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

            formData.append('contact', this.form.contact)
            formData.append('prix', this.form.prix)
            formData.append('stock', this.form.stock)
            formData.append('description', this.form.description)
            formData.append('produit', this.form.produit.id)

            const compressedImages = []
            for (const img of imagesObject.images) {
              const blob = await compressImage(img)
              compressedImages.push(blob)
            }

            compressedImages.forEach((img) =>
              formData.append('images', img, img.name)
            )

            await this.$api.updateDemande(formData, this.id)
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
