<template>
  <v-main>
    <v-container fluid>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" sm="8">
          <!-- Header -->

          <!-- Form -->
          <v-card
            :disabled="loading"
            :loading="loading"
            outlined
            max-width="600"
            class="mx-auto mb-4 text-center"
            elevation="5"
          >
            <v-card
              outlined
              max-width="600"
              class="text-center mx-auto mt-5"
              color="transparent"
            >
              <nuxt-link :to="localePath('/')">
                <v-avatar size="80">
                  <v-img src="/icon.jpg"></v-img>
                </v-avatar>
              </nuxt-link>

              <v-card-text>
                <h1 class="text-h6 text-md-h5">
                  {{ $t('brand.title') }}
                </h1>
              </v-card-text>
            </v-card>
            <v-form @submit.prevent="submitForm">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model.trim.lazy="form.pays"
                      :items="matchedPays"
                      item-text="nom"
                      item-value="id"
                      autocomplete="off"
                      outlined
                      dense
                      :label="$t('exploitant.form.pays')"
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
                      outlined
                      dense
                      :label="$t('exploitant.form.ville')"
                      return-object
                      :error-messages="villeErrors"
                      @input="$v.form.ville.$touch()"
                      @blur="$v.form.ville.$touch()"
                    ></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.trim.lazy="form.username"
                      :label="$t('exploitant.form.username')"
                      autocomplete="off"
                      outlined
                      dense
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
                      v-model.trim.lazy="form.telephone"
                      :label="$t('exploitant.form.telephone')"
                      type="number"
                      autocomplete="off"
                      outlined
                      dense
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
                  <v-col cols="12">
                    <v-text-field
                      v-model.trim.lazy="form.email"
                      :label="$t('exploitant.form.email')"
                      type="email"
                      autocomplete="off"
                      outlined
                      dense
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
                      v-model.trim="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      :label="$t('exploitant.form.password')"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      autocomplete="off"
                      outlined
                      dense
                      :error-messages="passwordErrors"
                      @click:append="showPassword = !showPassword"
                      @input="$v.form.password.$touch()"
                      @blur="$v.form.password.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.trim="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      :label="$t('exploitant.form.confirmPassword')"
                      :append-icon="
                        showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      autocomplete="off"
                      outlined
                      dense
                      :error-messages="confirmPasswordErrors"
                      @click:append="showConfirmPassword = !showConfirmPassword"
                      @input="$v.form.confirmPassword.$touch()"
                      @blur="$v.form.confirmPassword.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-text class="pt-0">
                <v-btn
                  :disabled="!isFormValid"
                  block
                  color="secondary"
                  class="subtitle-1 font-weight-medium pt-5 pb-5"
                  depressed
                  small
                  type="submit"
                >
                  {{ $t('connexion.login') }}
                </v-btn>
              </v-card-text>
              <v-card-actions class="pt-0 pb-0">
                <v-row align="center" justify="center">
                  <v-card-subtitle class="pt-0 pb-8 pr-0">{{
                    $t('siginup.account')
                  }}</v-card-subtitle>
                  <v-card-subtitle
                    color="primary"
                    class="p-inscrire pt-0 pb-8 pl-0"
                  >
                    <v-btn
                      small
                      color="secondary"
                      hidden
                      text
                      depressed
                      elevation="0"
                      to="/login/connexion"
                    >
                      {{ $t('siginup.sigin') }}
                    </v-btn>
                  </v-card-subtitle>
                </v-row>
              </v-card-actions>
              <v-card-text class="pt-0 pb-5">
                <v-card-subtitle color="primary" class="pt-0 pb-4">
                  {{ $t('connexion.msg2') }}
                </v-card-subtitle>
                <v-btn
                  color="secondary"
                  text
                  outlined
                  rounded
                  to="/login/siginUpExp"
                >
                  {{ $t('connexion.signUpExp1') }}
                </v-btn>
              </v-card-text>
            </v-form>
          </v-card>

          <!-- Help block -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import { mapState } from 'vuex'
import {
  email,
  maxLength,
  minLength,
  required,
  sameAs,
} from 'vuelidate/lib/validators'
import {
  hasLowercase,
  hasUppercase,
  hasNumber,
  usernameRegex,
} from '~/helpers/customValidators'
import { debounce } from '~/helpers/helpers.js'

export default {
  name: 'ConnexionPage',
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      menuOptions: {
        transition: 'slide-y-transition',
      },
      form: {
        username: '',
        email: '',
        telephone: '',
        ville: null,
        pays: null,
        password: '',
        confirmPassword: '',
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
      pays: {
        required,
      },
      ville: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
        hasLowercase,
        hasUppercase,
        hasNumber,
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },

  async fetch() {
    this.loading = true
    try {
      await Promise.all([
        this.$store.dispatch('pays/fetchAllAuthPayss'),
        this.$store.dispatch('ville/fetchAllAuthVilles'),
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
      return (
        !this.$v.form.$invalid &&
        !this.$v.form.$pending &&
        this.isUnique.username &&
        this.isUnique.email &&
        this.isUnique.telephone
      )
    },
    isSm() {
      if (!this.$vuetify.breakpoint.smAndDown) {
        return 'fab-btn'
      } else {
        return 'fab-btn1'
      }
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
    passwordErrors() {
      const errors = []

      if (!this.$v.form.password.$dirty) return errors

      !this.$v.form.password.required &&
        errors.push(this.$t('validations.password.required'))

      !this.$v.form.password.minLength &&
        errors.push(
          this.$t('validations.password.min', {
            length: this.$v.form.password.$params.minLength.min,
          })
        )

      !this.$v.form.password.hasLowercase &&
        errors.push(this.$t('validations.password.lowercase'))

      !this.$v.form.password.hasUppercase &&
        errors.push(this.$t('validations.password.uppercase'))

      !this.$v.form.password.hasNumber &&
        errors.push(this.$t('validations.password.number'))

      return errors
    },
    confirmPasswordErrors() {
      const errors = []

      if (!this.$v.form.confirmPassword.$dirty) return errors

      !this.$v.form.confirmPassword.required &&
        errors.push(this.$t('validations.confirmPassword.required'))

      !this.$v.form.confirmPassword.sameAsPassword &&
        errors.push(this.$t('validations.confirmPassword.confirmed'))

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
      pays: (state) => state.pays.allAuthPays,
      villes: (state) => state.ville.allAuthVilles,
    }),
  },
  watch: {
    'form.username'() {
      this.isPending.username = true
      this.isUnique.username = false
    },
    'form.email'() {
      this.isPending.email = true
      this.isUnique.email = false
    },
    'form.telephone'() {
      this.isPending.telephone = true
      this.isUnique.telephone = false
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
          const result = await this.$api.checkUserUsernameAuth(
            this.form.username
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
          const result = await this.$api.checkUserEmailAuth(this.form.email)
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
          const result = await this.$api.checkUserTelAuth(this.form.telephone)
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
          'ville/fetchAllAuthVillesPays',
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
    resetForm() {
      this.$v.form.$reset()
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

      this.form = {
        username: '',
        email: '',
        telephone: '',
        ville: null,
        pays: null,
        password: '',
        confirmPassword: '',
      }

      this.showPassword = false
      this.showConfirmPassword = false
      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.saveUserAuthSimple({
            username: this.form.username,
            email: this.form.email,
            telPersonnel: this.form.telephone,
            password: this.form.password,
            ville: this.form.ville.id,
          })

          this.$router.push('/login/connexion')

          this.resetForm()
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
    // async loginUser() {
    //   this.$v.form.$touch()
    //   if (!this.$v.form.$invalid) {
    //     this.loading = true

    //     try {
    //       const { data } = await this.$auth.loginWith('local', {
    //         data: this.form,
    //       })
    //       if (data.user.profils.length === 0) {
    //         await this.$auth.logout()
    //         this.loading = false
    //         this.$toast.error(this.$t('logins.accessDenied'))
    //       } else {
    //         this.$auth.setUser(data.user)

    //         this.resetForm()
    //         this.$toast.success(this.$t('logins.success'))
    //       }
    //     } catch (err) {
    //       this.loading = false

    //       if (err.response) {
    //         if (err.response.status === 401) {
    //           this.$toast.error(this.$t('logins.loginFailed'))
    //         } else {
    //           this.$toast.error(this.$t('logins.errorOccured'))
    //         }
    //       } else {
    //         this.$nuxt.error({
    //           statusCode: 503,
    //           message: 'Unable to fetch data.',
    //         })
    //       }
    //     }
    //   }
    // },
  },
}
</script>
<style scoped></style>
