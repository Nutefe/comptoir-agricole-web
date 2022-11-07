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
                {{ $t('magasin.edit') }}
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
                v-model.trim="form.nom"
                :label="$t('magasin.form.nom')"
                autocomplete="off"
                :maxlength="$v.form.nom.$params.maxLength.max"
                :error-messages="nomErrors"
                @input="$v.form.nom.$touch()"
                @blur="$v.form.nom.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="form.adresse"
                :label="$t('magasin.form.adresse')"
                autocomplete="off"
                :maxlength="$v.form.adresse.$params.maxLength.max"
                :error-messages="adresseErrors"
                @input="$v.form.adresse.$touch()"
                @blur="$v.form.adresse.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="form.telephone"
                :label="$t('magasin.form.telephone')"
                autocomplete="off"
                type="number"
                :maxlength="$v.form.telephone.$params.maxLength.max"
                :error-messages="telephoneErrors"
                @input="$v.form.telephone.$touch()"
                @blur="$v.form.telephone.$touch()"
              ></v-text-field>
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
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { isEqual } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      id: null,
      selectedItem: {
        nom: '',
        adresse: '',
        telephone: '',
      },
      form: {
        nom: '',
        adresse: '',
        telephone: '',
      },
    }
  },
  validations: {
    form: {
      nom: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      adresse: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      telephone: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(100),
      },
    },
  },

  computed: {
    isFormValid() {
      const isFormEdited = !isEqual(this.selectedItem, this.form)
      return isFormEdited && !this.$v.form.$invalid
    },
    isSm() {
      if (!this.$vuetify.breakpoint.smAndDown) {
        return 'fab-btn'
      } else {
        return 'fab-btn1'
      }
    },

    nomErrors() {
      const errors = []

      if (!this.$v.form.nom.$dirty) return errors

      !this.$v.form.nom.required &&
        errors.push(this.$t('validations.nom.required'))

      !this.$v.form.nom.minLength &&
        errors.push(
          this.$t('validations.nom.min', {
            length: this.$v.form.nom.$params.minLength.min,
          })
        )

      !this.$v.form.nom.maxLength &&
        errors.push(
          this.$t('validations.nom.max', {
            length: this.$v.form.nom.$params.maxLength.max,
          })
        )

      return errors
    },
    adresseErrors() {
      const errors = []

      if (!this.$v.form.adresse.$dirty) return errors

      !this.$v.form.adresse.required &&
        errors.push(this.$t('validations.adresse.required'))

      !this.$v.form.adresse.minLength &&
        errors.push(
          this.$t('validations.adresse.min', {
            length: this.$v.form.adresse.$params.minLength.min,
          })
        )

      !this.$v.form.adresse.maxLength &&
        errors.push(
          this.$t('validations.adresse.max', {
            length: this.$v.form.adresse.$params.maxLength.max,
          })
        )

      return errors
    },
    telephoneErrors() {
      const errors = []

      if (!this.$v.form.telephone.$dirty) return errors

      !this.$v.form.telephone.required &&
        errors.push(this.$t('validations.telephone.required'))

      !this.$v.form.telephone.minLength &&
        errors.push(
          this.$t('validations.telephone.min', {
            length: this.$v.form.telephone.$params.minLength.min,
          })
        )

      !this.$v.form.telephone.maxLength &&
        errors.push(
          this.$t('validations.telephone.max', {
            length: this.$v.form.telephone.$params.maxLength.max,
          })
        )

      return errors
    },
  },
  watch: {},
  methods: {
    openDialog(item) {
      this.id = item.id
      this.form = {
        nom: item.nom || '',
        adresse: item.adresse || '',
        telephone: item.telephone || '',
      }
      this.selectedItem = Object.assign({}, this.form)

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$v.form.$reset()

      this.id = null
      this.form = {
        nom: '',
        adresse: '',
        telephone: '',
      }
      this.selectedItem = {
        nom: '',
        adresse: '',
        telephone: '',
      }

      this.loading = false
    },
    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.updateMagasin(
            {
              nom: this.form.nom,
              adresse: this.form.adresse,
              telephone: this.form.telephone,
            },
            this.id
          )
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
