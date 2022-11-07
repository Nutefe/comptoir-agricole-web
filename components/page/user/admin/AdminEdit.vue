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
                {{ $t('admin.edit') }}
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
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model.trim.lazy="form.pays"
                :items="matchedPays"
                item-text="nom"
                item-value="id"
                autocomplete="off"
                :label="$t('admin.form.pays')"
                return-object
                :error-messages="paysErrors"
                @input="$v.form.pays.$touch()"
                @blur="$v.form.pays.$touch()"
                @change="loadVilleChang"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model.trim.lazy="form.ville"
                :items="matchedVilles"
                :item-text="getItemText"
                item-value="id"
                autocomplete="off"
                :label="$t('admin.form.ville')"
                return-object
                :error-messages="villeErrors"
                @input="$v.form.ville.$touch()"
                @blur="$v.form.ville.$touch()"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim.lazy="form.username"
                :label="$t('user.form.username')"
                autocomplete="off"
                :maxlength="$v.form.username.$params.maxLength.max"
                :error-messages="usernameErrors"
                @input="
                  $v.form.username.$touch()
                  checkUniqueUsername()
                "
                @blur="
                  $v.form.username.$touch()
                  checkUniqueUsername()
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim.lazy="form.email"
                :label="$t('admin.form.email')"
                type="email"
                autocomplete="off"
                :maxlength="$v.form.email.$params.maxLength.max"
                :error-messages="emailErrors"
                @input="
                  $v.form.email.$touch()
                  checkUniqueEmail()
                "
                @blur="
                  $v.form.email.$touch()
                  checkUniqueEmail()
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model.trim.lazy="form.telephone"
                :label="$t('admin.form.telephone')"
                type="number"
                autocomplete="off"
                :maxlength="$v.form.telephone.$params.maxLength.max"
                :error-messages="telephoneErrors"
                @input="
                  $v.form.telephone.$touch()
                  checkUniqueTelephone()
                "
                @blur="
                  $v.form.telephone.$touch()
                  checkUniqueTelephone()
                "
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
import { mapState } from 'vuex'
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators'
import { usernameRegex } from '~/helpers/customValidators'
import { debounce, isEqual } from '~/helpers/helpers.js'

export default {
  name: 'AdminEdit',
  data() {
    return {
      dialog: false,
      loading: false,
      id: null,
      selectedItem: {
        username: '',
        email: '',
        telephone: '',
        ville: null,
        pays: null,
      },
      form: {
        username: '',
        email: '',
        telephone: '',
        ville: null,
        pays: null,
      },
      isUnique: {
        username: false,
        email: false,
        telephone: false,
      },
      isPending: {
        username: false,
        email: false,
        telephone: false,
      },
      isLoaded: {
        username: false,
        email: false,
        telephone: false,
      },
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
        regex: usernameRegex,
      },
      email: {
        required,
        email,
        maxLength: maxLength(200),
      },
      telephone: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      ville: {
        required,
      },
      pays: {
        required,
      },
    },
  },
  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        this.$store.dispatch('pays/fetchAllPayss'),
        this.$store.dispatch('ville/fetchAllVilles'),
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
      return (
        isFormEdited &&
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        this.isUnique.username &&
        this.isUnique.email &&
        this.isUnique.telephone
      )
    },
    usernameErrors() {
      const errors = []

      if (!this.$v.form.username.$dirty) return errors

      !this.$v.form.username.required &&
        errors.push(this.$t('validations.username.required'))

      !this.$v.form.username.minLength &&
        errors.push(
          this.$t('validations.username.min', {
            length: this.$v.form.username.$params.minLength.min,
          })
        )

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$t('validations.username.max', {
            length: this.$v.form.username.$params.maxLength.max,
          })
        )

      !this.$v.form.username.regex &&
        errors.push(this.$t('validations.username.regex'))

      this.form.username &&
        !this.isPending.username &&
        !this.isUnique.username &&
        errors.push(this.$t('validations.username.unique'))

      return errors
    },
    emailErrors() {
      const errors = []

      if (!this.$v.form.email.$dirty) return errors

      !this.$v.form.email.required &&
        errors.push(this.$t('validations.email.required'))

      !this.$v.form.email.email &&
        errors.push(this.$t('validations.email.email'))

      !this.$v.form.email.maxLength &&
        errors.push(
          this.$t('validations.email.max', {
            length: this.$v.form.email.$params.maxLength.max,
          })
        )

      this.form.email &&
        !this.isPending.email &&
        !this.isUnique.email &&
        errors.push(this.$t('validations.email.unique'))

      return errors
    },
    telephoneErrors() {
      const errors = []

      if (!this.$v.form.telephone.$dirty) return errors

      !this.$v.form.telephone.required &&
        errors.push(this.$t('validations.telephone.required'))

      !this.$v.form.telephone.maxLength &&
        errors.push(
          this.$t('validations.telephone.max', {
            length: this.$v.form.telephone.$params.maxLength.max,
          })
        )

      this.form.telephone &&
        !this.isPending.telephone &&
        !this.isUnique.telephone &&
        errors.push(this.$t('validations.telephone.unique'))

      return errors
    },
    paysErrors() {
      const errors = []

      if (!this.$v.form.pays.$dirty) return errors

      !this.$v.form.pays.required &&
        errors.push(this.$t('validations.pays.required'))

      return errors
    },

    villeErrors() {
      const errors = []

      if (!this.$v.form.ville.$dirty) return errors

      !this.$v.form.ville.required &&
        errors.push(this.$t('validations.ville.required'))

      return errors
    },

    matchedPays() {
      return this.pays.map((pay) => {
        const pays = pay.libelle
        return Object.assign({}, pay, { pays })
      })
    },

    matchedVilles() {
      return this.villes.map((ville) => {
        const villes = ville.nom
        return Object.assign({}, ville, { villes })
      })
    },

    ...mapState({
      pays: (state) => state.pays.allPays,
      villes: (state) => state.ville.allVilles,
    }),
  },
  watch: {
    'form.username'() {
      if (this.isLoaded.username) {
        this.isPending.username = true
        this.isUnique.username = false
      }
      this.isLoaded.username = true
    },
    'form.email'() {
      if (this.isLoaded.email) {
        this.isPending.email = true
        this.isUnique.email = false
      }
      this.isLoaded.email = true
    },
    'form.telephone'() {
      if (this.isLoaded.telephone) {
        this.isPending.telephone = true
        this.isUnique.telephone = false
      }
      this.isLoaded.telephone = true
    },
  },
  methods: {
    checkUniqueUsername: debounce(
      async function () {
        if (
          this.form.username === '' ||
          this.form.username === null ||
          this.$v.form.username.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUserUsernameUpdate(
            this.form.username,
            this.id
          )
          this.isUnique.username = !result
        } catch (err) {
          this.isUnique.username = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.username = false
      },
      500,
      -1
    ),
    checkUniqueEmail: debounce(
      async function () {
        if (
          this.form.email === '' ||
          this.form.email === null ||
          this.$v.form.email.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUserEmailUpdate(
            this.form.email,
            this.id
          )
          this.isUnique.email = !result
        } catch (err) {
          this.isUnique.email = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.email = false
      },
      500,
      -1
    ),
    checkUniqueTelephone: debounce(
      async function () {
        if (
          this.form.telephone === '' ||
          this.form.telephone === null ||
          this.$v.form.telephone.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkTel(this.form.telephone)
          this.isUnique.telephone = !result
        } catch (err) {
          this.isUnique.telephone = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.telephone = false
      },
      500,
      -1
    ),
    getItemText(item) {
      return `${item.region.nom} ${item.nom}`
    },
    async loadVilleChang() {
      this.loading = true
      try {
        this.form.ville = null
        await this.$store.dispatch(
          'ville/fetchAllVillesPays',
          this.form.pays.id
        )
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
      this.loading = false
    },
    openDialog(item) {
      this.id = item.id
      this.form = {
        username: item.username || '',
        email: item.email || '',
        telephone: item.telephone || '',
        ville: item.ville || null,
        pays: item.ville.region.pays || null,
      }
      this.selectedItem = Object.assign({}, this.form)

      this.isUnique = {
        username: !!this.form.username,
        email: !!this.form.email,
        telephone: !!this.form.telephone,
      }
      this.isLoaded = {
        username: false,
        email: false,
        telephone: false,
      }

      this.dialog = true
    },
    closeDialog() {
      this.dialog = false

      this.isUnique = {
        username: false,
        email: false,
        telephone: false,
      }
      this.isPending = {
        username: false,
        email: false,
        telephone: false,
      }
      this.isLoaded = {
        username: false,
        email: false,
        telephone: false,
      }
      this.$v.form.$reset()

      this.id = null
      this.form = {
        username: '',
        email: '',
        telephone: '',
        ville: null,
        pays: null,
      }
      this.selectedItem = {
        username: '',
        email: '',
        telephone: '',
        ville: null,
      }

      this.loading = false
    },
    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.updateUserAdmin(
            {
              username: this.form.username,
              email: this.form.email,
              telephone: this.form.telephone,
              ville: this.form.ville.id,
              role: 1,
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
