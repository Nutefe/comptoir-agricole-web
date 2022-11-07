<template>
  <v-main>
    <v-container fluid>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12">
          <!-- Header -->

          <!-- Form -->
          <v-card
            :disabled="loading"
            :loading="loading"
            outlined
            max-width="350"
            class="mx-auto mb-4 text-center"
            elevation="5"
          >
            <v-card
              outlined
              max-width="360"
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
            <v-form @submit.prevent="loginUser">
              <v-card-text>
                <v-text-field
                  v-model.trim="form.username"
                  color="secondary"
                  :label="$t('connexion.username')"
                  class="mb-2"
                  autocomplete="username"
                  required
                  outlined
                  dense
                  :error-messages="usernameErrors"
                  @input="$v.form.username.$touch()"
                  @blur="$v.form.username.$touch()"
                ></v-text-field>

                <v-text-field
                  v-model.trim="form.password"
                  color="secondary"
                  :type="showPassword ? 'text' : 'password'"
                  :label="$t('connexion.password')"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  autocomplete="current-password"
                  required
                  outlined
                  dense
                  :error-messages="passwordErrors"
                  @click:append="showPassword = !showPassword"
                  @input="$v.form.password.$touch()"
                  @blur="$v.form.password.$touch()"
                ></v-text-field>
              </v-card-text>

              <v-card-text class="pt-0">
                <v-btn
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
                <v-card-subtitle class="pt-0 pb-8 pr-0">{{
                  $t('connexion.newAccount')
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
                    to="/login/siginUp"
                  >
                    {{ $t('connexion.signUp') }}
                  </v-btn>
                </v-card-subtitle>
              </v-card-actions>
              <v-card-text class="pt-0 pb-5">
                <v-card-subtitle color="primary" class="pt-0 pb-4">
                  {{ $t('connexion.msg2') }}
                </v-card-subtitle>
                <v-btn
                  color="secondary"
                  outlined
                  rounded
                  text
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ConnexionPage',
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      showPassword: false,
      loading: false,
    }
  },

  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },

  computed: {
    usernameErrors() {
      const errors = []

      if (!this.$v.form.username.$dirty) return errors

      !this.$v.form.username.required &&
        errors.push(this.$t('validations.username.required'))

      return errors
    },

    passwordErrors() {
      const errors = []

      if (!this.$v.form.password.$dirty) return errors

      !this.$v.form.password.required &&
        errors.push(this.$t('validations.password.required'))

      return errors
    },
  },

  methods: {
    resetForm() {
      this.$v.form.$reset()
      this.form = {
        username: '',
        password: '',
      }
      this.showPassword = false
      this.loading = false
    },

    async loginUser() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.loading = true

        try {
          const { data } = await this.$auth.loginWith('local', {
            data: this.form,
          })
          if (!data.user.role) {
            await this.$auth.logout()
            this.loading = false
            this.$toast.error(this.$t('logins.accessDenied'))
          } else {
            this.$auth.setUser(data.user)
            this.resetForm()
            this.$toast.success(this.$t('logins.success'))
          }
        } catch (err) {
          this.loading = false

          if (err.response) {
            if (err.response.status === 401) {
              this.$toast.error(this.$t('logins.loginFailed'))
            } else {
              this.$toast.error(this.$t('logins.errorOccured'))
            }
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
<style scoped></style>
