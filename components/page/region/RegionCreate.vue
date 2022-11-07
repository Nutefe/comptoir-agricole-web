<template>
  <div>
    <v-tooltip left>
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="secondary"
          dark
          bottom
          right
          fixed
          fab
          :class="isSm"
          :aria-label="$t('region.new')"
          @click.stop="dialog = true"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <span>
        {{ $t('region.new') }}
      </span>
    </v-tooltip>

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
                  {{ $t('region.new') }}
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
                  v-model.trim.lazy="form.pays"
                  :items="matchedPays"
                  item-text="nom"
                  item-value="id"
                  autocomplete="off"
                  :label="$t('region.form.pays')"
                  return-object
                  :error-messages="paysErrors"
                  @input="$v.form.pays.$touch()"
                  @blur="$v.form.pays.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.trim="form.nom"
                  :label="$t('region.form.nom')"
                  autocomplete="off"
                  :maxlength="$v.form.nom.$params.maxLength.max"
                  :error-messages="nomErrors"
                  @input="$v.form.nom.$touch()"
                  @blur="$v.form.nom.$touch()"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      menuOptions: {
        transition: 'slide-y-transition',
      },
      form: {
        nom: '',
        pays: null,
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
      pays: {
        required,
      },
    },
  },
  async fetch() {
    this.loading = true
    try {
      await this.$store.dispatch('pays/fetchAllPayss')
    } catch (err) {
      this.$nuxt.error({
        statusCode: 503,
        message: 'Unable to fetch data.',
      })
    }
    this.loading = false
  },
  computed: {
    isSm() {
      if (!this.$vuetify.breakpoint.smAndDown) {
        return 'fab-btn'
      } else {
        return 'fab-btn1'
      }
    },

    isFormValid() {
      return !this.$v.form.$invalid
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
    paysErrors() {
      const errors = []

      if (!this.$v.form.pays.$dirty) return errors

      !this.$v.form.pays.required &&
        errors.push(this.$t('validations.pays.required'))

      return errors
    },

    matchedPays() {
      return this.pays.map((pay) => {
        const pays = pay.nom
        return Object.assign({}, pay, { pays })
      })
    },

    ...mapState({
      pays: (state) => state.pays.allPays,
    }),
  },

  methods: {
    closeDialog() {
      this.dialog = false

      this.$v.form.$reset()

      this.form = {
        nom: '',
        pays: null,
      }

      this.loading = false
    },

    async submitForm() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.loading = true

        try {
          await this.$api.saveRegion({
            nom: this.form.nom,
            pays: this.form.pays.id,
          })
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
