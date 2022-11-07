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
                {{ $t('user.edit') }}
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
                v-model.trim.lazy="form.nom"
                :label="$t('pays.form.nom')"
                autocomplete="off"
                :maxlength="$v.form.nom.$params.maxLength.max"
                :error-messages="nomErrors"
                @input="
                  $v.form.nom.$touch()
                  checkUniqueNom()
                "
                @blur="
                  $v.form.nom.$touch()
                  checkUniqueNom()
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model.trim.lazy="form.code"
                :label="$t('pays.form.code')"
                autocomplete="off"
                :maxlength="$v.form.code.$params.maxLength.max"
                :error-messages="codeErrors"
                @input="
                  $v.form.code.$touch()
                  checkUniqueCode()
                "
                @blur="
                  $v.form.code.$touch()
                  checkUniqueCode()
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model.trim.lazy="form.indicatif"
                :label="$t('pays.form.indicatif')"
                autocomplete="off"
                :maxlength="$v.form.indicatif.$params.maxLength.max"
                :error-messages="indicatifErrors"
                @input="$v.form.indicatif.$touch()"
                @blur="$v.form.indicatif.$touch()"
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
import { debounce, isEqual } from '~/helpers/helpers.js'

export default {
  name: 'PaysCreate',
  data() {
    return {
      dialog: false,
      loading: false,
      id: null,
      selectedItem: {
        nom: '',
        code: '',
        indicatif: '',
      },
      form: {
        nom: '',
        code: '',
        indicatif: '',
      },
      isUnique: {
        nom: false,
        code: false,
      },
      isPending: {
        nom: false,
        code: false,
      },
      isLoaded: {
        nom: false,
        code: false,
      },
    }
  },
  validations: {
    form: {
      nom: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
      },
      code: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(10),
      },
      indicatif: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
    },
  },
  computed: {
    isFormValid() {
      const isFormEdited = !isEqual(this.selectedItem, this.form)
      return (
        isFormEdited &&
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        this.isUnique.nom &&
        this.isUnique.code
      )
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

      this.form.nom &&
        !this.isPending.nom &&
        !this.isUnique.nom &&
        errors.push(this.$t('validations.nom.unique'))
      return errors
    },
    codeErrors() {
      const errors = []

      if (!this.$v.form.code.$dirty) return errors

      !this.$v.form.code.required &&
        errors.push(this.$t('validations.code.required'))

      !this.$v.form.code.minLength &&
        errors.push(
          this.$t('validations.code.min', {
            length: this.$v.form.code.$params.minLength.min,
          })
        )

      !this.$v.form.code.maxLength &&
        errors.push(
          this.$t('validations.code.max', {
            length: this.$v.form.code.$params.maxLength.max,
          })
        )

      this.form.code &&
        !this.isPending.code &&
        !this.isUnique.code &&
        errors.push(this.$t('validations.code.unique'))

      return errors
    },

    indicatifErrors() {
      const errors = []

      if (!this.$v.form.indicatif.$dirty) return errors

      !this.$v.form.indicatif.required &&
        errors.push(this.$t('validations.indicatif.required'))

      !this.$v.form.indicatif.minLength &&
        errors.push(
          this.$t('validations.indicatif.min', {
            length: this.$v.form.indicatif.$params.minLength.min,
          })
        )

      !this.$v.form.indicatif.maxLength &&
        errors.push(
          this.$t('validations.indicatif.max', {
            length: this.$v.form.indicatif.$params.maxLength.max,
          })
        )

      return errors
    },
  },
  watch: {
    'form.nom'() {
      if (this.isLoaded.nom) {
        this.isPending.nom = true
        this.isUnique.nom = false
      }
      this.isLoaded.nom = true
    },
    'form.code'() {
      if (this.isLoaded.code) {
        this.isPending.code = true
        this.isUnique.code = false
      }
      this.isLoaded.code = true
    },
  },
  methods: {
    checkUniqueNom: debounce(
      async function () {
        if (
          this.form.nom === '' ||
          this.form.nom === null ||
          this.$v.form.nom.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkNomUpdate(this.form.nom, this.id)
          this.isUnique.nom = !result
        } catch (err) {
          this.isUnique.nom = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.nom = false
      },
      500,
      -1
    ),
    checkUniqueCode: debounce(
      async function () {
        if (
          this.form.code === '' ||
          this.form.code === null ||
          this.$v.form.code.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkCodeUpdate(
            this.form.code,
            this.id
          )
          this.isUnique.code = !result
        } catch (err) {
          this.isUnique.code = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.code = false
      },
      500,
      -1
    ),
    openDialog(item) {
      this.id = item.id
      this.form = {
        nom: item.nom || '',
        code: item.code || '',
        indicatif: item.indicatif || '',
      }
      this.selectedItem = Object.assign({}, this.form)

      this.isUnique = {
        nom: !!this.form.nom,
        code: !!this.form.code,
      }
      this.isLoaded = {
        nom: false,
        code: false,
      }

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.isUnique = {
        nom: false,
        code: false,
      }
      this.isPending = {
        nom: false,
        code: false,
      }
      this.isLoaded = {
        nom: false,
        code: false,
      }
      this.$v.form.$reset()

      this.id = null
      this.form = {
        nom: '',
        code: '',
        indicatif: '',
      }
      this.selectedItem = {
        code: '',
        nom: '',
        indicatif: '',
      }

      this.loading = false
    },
    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.updatePays(
            {
              nom: this.form.nom,
              code: this.form.code,
              indicatif: this.form.indicatif,
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
