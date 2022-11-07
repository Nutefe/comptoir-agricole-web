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
                v-model.trim.lazy="form.produit"
                :items="matchedProduits"
                item-text="designation"
                item-value="id"
                autocomplete="off"
                :label="$t('speculation.form.produit')"
                return-object
                :error-messages="produitErrors"
                @input="$v.form.produit.$touch()"
                @blur="$v.form.produit.$touch()"
              ></v-autocomplete> </v-col
            ><v-col cols="12" sm="6">
              <v-autocomplete
                v-model.trim.lazy="form.exploitant"
                :items="matchedExploitants"
                item-text="nom"
                item-value="id"
                autocomplete="off"
                :label="$t('speculation.form.exploitant')"
                return-object
                :error-messages="exploitantErrors"
                @input="$v.form.exploitant.$touch()"
                @blur="$v.form.exploitant.$touch()"
              ></v-autocomplete> </v-col
            ><v-col cols="12" sm="6">
              <v-autocomplete
                v-model.trim.lazy="form.magasin"
                :items="matchedMagasins"
                item-text="nom"
                item-value="id"
                autocomplete="off"
                :label="$t('speculation.form.magasin')"
                return-object
                :error-messages="magasinErrors"
                @input="$v.form.magasin.$touch()"
                @blur="$v.form.magasin.$touch()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.superficie"
                autofocus
                :label="$t('speculation.form.superficie')"
                autocomplete="off"
                  type="number"
                  step="0.01"
                :maxlength="$v.form.superficie.$params.maxLength.max"
                :error-messages="superficieErrors"
                @input="$v.form.superficie.$touch()"
                @blur="$v.form.superficie.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.supNonExploite"
                autofocus
                :label="$t('speculation.form.supNonExploite')"
                autocomplete="off"
                  type="number"
                  step="0.01"
                :maxlength="$v.form.supNonExploite.$params.maxLength.max"
                :error-messages="supNonExploiteErrors"
                @input="$v.form.supNonExploite.$touch()"
                @blur="$v.form.supNonExploite.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.stockSpontane"
                autofocus
                :label="$t('speculation.form.stockSpontane')"
                autocomplete="off"
                  type="number"
                  step="0.01"
                :maxlength="$v.form.stockSpontane.$params.maxLength.max"
                :error-messages="stockSpontaneErrors"
                @input="$v.form.stockSpontane.$touch()"
                @blur="$v.form.stockSpontane.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.stockPrevisionnel"
                autofocus
                :label="$t('speculation.form.stockPrevisionnel')"
                autocomplete="off"
                  type="number"
                  step="0.01"
                :maxlength="$v.form.stockPrevisionnel.$params.maxLength.max"
                :error-messages="stockPrevisionnelErrors"
                @input="$v.form.stockPrevisionnel.$touch()"
                @blur="$v.form.stockPrevisionnel.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.mode"
                autofocus
                :label="$t('speculation.form.mode')"
                autocomplete="off"
                :maxlength="$v.form.mode.$params.maxLength.max"
                :error-messages="modeErrors"
                @input="$v.form.mode.$touch()"
                @blur="$v.form.mode.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim="form.besoin"
                autofocus
                :label="$t('speculation.form.besoin')"
                autocomplete="off"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model.trim="form.description"
                autofocus
                :label="$t('speculation.form.description')"
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
        superficie: '',
        supNonExploite: '',
        stockSpontane: '',
        stockPrevisionnel: '',
        exploitant: null,
        magasin: null,
        mode: '',
        besoin: '',
        description: '',
      },
      form: {
        produit: null,
        superficie: '',
        supNonExploite: '',
        stockSpontane: '',
        stockPrevisionnel: '',
        exploitant: null,
        magasin: null,
        mode: '',
        besoin: '',
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
      superficie: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      supNonExploite: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      stockSpontane: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      stockPrevisionnel: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      produit: {
        required,
      },
      mode: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(150),
      },
      exploitant: {
        required,
      },
      magasin: {
        required,
      },
    },
  },
  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        this.$store.dispatch('produit/fetchAllProduits'),
        this.$store.dispatch('magasin/fetchAllMagasins'),
        this.$store.dispatch('exploitant/fetchAllUsers'),
      ])
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
    superficieErrors() {
      const errors = []

      if (!this.$v.form.superficie.$dirty) return errors

      !this.$v.form.superficie.required &&
        errors.push(this.$t('validations.superficie.required'))

      !this.$v.form.superficie.minLength &&
        errors.push(
          this.$t('validations.superficie.min', {
            length: this.$v.form.superficie.$params.minLength.min,
          })
        )

      !this.$v.form.superficie.maxLength &&
        errors.push(
          this.$t('validations.superficie.max', {
            length: this.$v.form.superficie.$params.maxLength.max,
          })
        )

      return errors
    },
    supNonExploiteErrors() {
      const errors = []

      if (!this.$v.form.supNonExploite.$dirty) return errors

      !this.$v.form.supNonExploite.required &&
        errors.push(this.$t('validations.supNonExploite.required'))

      !this.$v.form.supNonExploite.minLength &&
        errors.push(
          this.$t('validations.supNonExploite.min', {
            length: this.$v.form.supNonExploite.$params.minLength.min,
          })
        )

      !this.$v.form.supNonExploite.maxLength &&
        errors.push(
          this.$t('validations.supNonExploite.max', {
            length: this.$v.form.supNonExploite.$params.maxLength.max,
          })
        )

      return errors
    },
    stockSpontaneErrors() {
      const errors = []

      if (!this.$v.form.stockSpontane.$dirty) return errors

      !this.$v.form.stockSpontane.required &&
        errors.push(this.$t('validations.stockSpontane.required'))

      !this.$v.form.stockSpontane.minLength &&
        errors.push(
          this.$t('validations.stockSpontane.min', {
            length: this.$v.form.stockSpontane.$params.minLength.min,
          })
        )

      !this.$v.form.stockSpontane.maxLength &&
        errors.push(
          this.$t('validations.stockSpontane.max', {
            length: this.$v.form.stockSpontane.$params.maxLength.max,
          })
        )

      return errors
    },
    stockPrevisionnelErrors() {
      const errors = []

      if (!this.$v.form.stockPrevisionnel.$dirty) return errors

      !this.$v.form.stockPrevisionnel.required &&
        errors.push(this.$t('validations.stockPrevisionnel.required'))

      !this.$v.form.stockPrevisionnel.minLength &&
        errors.push(
          this.$t('validations.stockPrevisionnel.min', {
            length: this.$v.form.stockPrevisionnel.$params.minLength.min,
          })
        )

      !this.$v.form.stockPrevisionnel.maxLength &&
        errors.push(
          this.$t('validations.stockPrevisionnel.max', {
            length: this.$v.form.stockPrevisionnel.$params.maxLength.max,
          })
        )

      return errors
    },
    modeErrors() {
      const errors = []

      if (!this.$v.form.mode.$dirty) return errors

      !this.$v.form.mode.required &&
        errors.push(this.$t('validations.mode.required'))

      !this.$v.form.mode.minLength &&
        errors.push(
          this.$t('validations.mode.min', {
            length: this.$v.form.mode.$params.minLength.min,
          })
        )

      !this.$v.form.mode.maxLength &&
        errors.push(
          this.$t('validations.mode.max', {
            length: this.$v.form.mode.$params.maxLength.max,
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
    exploitantErrors() {
      const errors = []

      if (!this.$v.form.exploitant.$dirty) return errors

      !this.$v.form.exploitant.required &&
        errors.push(this.$t('validations.exploitant.required'))

      return errors
    },
    magasinErrors() {
      const errors = []

      if (!this.$v.form.magasin.$dirty) return errors

      !this.$v.form.magasin.required &&
        errors.push(this.$t('validations.magasin.required'))

      return errors
    },

    matchedProduits() {
      return this.produits.map((produit) => {
        const produits = produit.libelle
        return Object.assign({}, produit, { produits })
      })
    },
    matchedExploitants() {
      return this.exploitants.map((exploitant) => {
        const exploitants = exploitant.libelle
        return Object.assign({}, exploitant, { exploitants })
      })
    },
    matchedMagasins() {
      return this.magasins.map((magasin) => {
        const magasins = magasin.libelle
        return Object.assign({}, magasin, { magasins })
      })
    },

    ...mapState({
      produits: (state) => state.produit.allProduits,
      magasins: (state) => state.magasin.allMagasins,
      exploitants: (state) => state.exploitant.allUsers,
    }),
  },
  methods: {
    openDialog(item) {
      // console.log(item)
      this.id = item.id
      this.form = {
        produit: item.produit || null,
        superficie: item.superficie || 0,
        supNonExploite: item.supNonExploite || 0,
        stockSpontane: item.stockSpontane || 0,
        stockPrevisionnel: item.stockPrevisionnel || 0,
        exploitant: item.exploitant || null,
        magasin: item.magasin || null,
        mode: item.modePaiement || '',
        besoin: item.besoin || '',
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
        superficie: '',
        supNonExploite: '',
        stockSpontane: '',
        stockPrevisionnel: '',
        exploitant: null,
        magasin: null,
        mode: '',
        besoin: '',
        description: '',
      }
      this.selectedItem = {
        produit: null,
        superficie: '',
        supNonExploite: '',
        stockSpontane: '',
        stockPrevisionnel: '',
        exploitant: null,
        magasin: null,
        mode: '',
        besoin: '',
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

            formData.append('superficie', this.form.superficie)
            formData.append('supNonExploite', this.form.supNonExploite)
            formData.append('stockSpontane', this.form.stockSpontane)
            formData.append('stockPrevisionnel', this.form.stockPrevisionnel)
            formData.append('produit', this.form.produit.id)
            formData.append('exploitant', this.form.exploitant.id)
            formData.append('magasin', this.form.magasin.id)
            formData.append('mode', this.form.mode)
            formData.append('besoin', this.form.besoin)
            formData.append('description', this.form.description)
            // formData.append('ids', JSON.stringify(imagesObject.ids))

            const compressedImages = []
            for (const img of imagesObject.images) {
              const blob = await compressImage(img)
              compressedImages.push(blob)
            }

            compressedImages.forEach((img) =>
              formData.append('images', img, img.name)
            )

            await this.$api.updateSpeculationExploitant(formData, this.id)
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
