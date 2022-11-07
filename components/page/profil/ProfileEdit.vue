<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.mobile"
      persistent
      scrollable
      max-width="900"
    >
      <v-card :disabled="loading" :loading="loading">
        <v-card-title class="px-3 px-md-5 py-2 py-md-3">
          <v-row align="center">
            <v-col cols="9">
              <span class="text-h6 text-md-h5 font-weight-regular">
                {{ $t('profil.edit.title') }}
              </span>
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-btn
                icon
                large
                :aria-label="$t('actions.close')"
                @click.stop="closeDialog"
              >
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-divider />

        <v-card-text class="dialog-body px-3 px-md-5 py-3">
          <v-container class="px-0">
            <v-row>
              <v-col cols="12" sm="5">
                <v-card outlined>
                  <v-list nav>
                    <v-list-item-group
                      v-model="selectedSection"
                      mandatory
                      color="primary"
                    >
                      <v-list-item
                        v-for="(section, index) in sections"
                        :key="index"
                        link
                      >
                        <v-list-item-icon class="mr-3">
                          <v-icon>
                            {{ section.icon }}
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>
                            {{ section.label }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action v-show="selectedSection === index">
                          <v-icon small> mdi-arrow-right </v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>

              <v-col cols="12" sm="7">
                <v-card outlined>
                  <v-window v-model="selectedSection" vertical>
                    <!-- Section 1 -->
                    <v-window-item :value="0">
                      <v-form @submit.prevent="submitAccountForm">
                        <v-subheader
                          class="font-weight-medium text-uppercase my-2 my-md-0"
                        >
                          {{ $t('profil.edit.sections.one.title') }}
                        </v-subheader>

                        <v-divider />

                        <v-card-text class="form-body">
                          <v-text-field
                            v-model.trim.lazy="accountForm.username"
                            prepend-icon="mdi-account-circle"
                            :label="$t('common.username')"
                            class="mb-2"
                            autocomplete="username"
                            :maxlength="
                              $v.accountForm.username.$params.maxLength.max
                            "
                            :error-messages="usernameErrors"
                            @input="
                              $v.accountForm.username.$touch()
                              checkUniqueUsername()
                            "
                            @blur="
                              $v.accountForm.username.$touch()
                              checkUniqueUsername()
                            "
                          ></v-text-field>

                          <v-text-field
                            v-model.trim.lazy="accountForm.email"
                            prepend-icon="mdi-email"
                            :label="$t('common.email')"
                            type="email"
                            autocomplete="email"
                            :maxlength="
                              $v.accountForm.email.$params.maxLength.max
                            "
                            :error-messages="emailErrors"
                            @input="
                              $v.accountForm.email.$touch()
                              checkUniqueEmail()
                            "
                            @blur="
                              $v.accountForm.email.$touch()
                              checkUniqueEmail()
                            "
                          ></v-text-field>
                        </v-card-text>

                        <v-divider />

                        <v-card-actions class="mx-2 my-2">
                          <v-spacer />

                          <v-btn
                            color="primary"
                            depressed
                            type="submit"
                            :disabled="disableAccountFormSubmitButton"
                          >
                            {{ $t('actions.save') }}
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-window-item>

                    <!-- Section 2 -->
                    <v-window-item :value="1">
                      <v-form @submit.prevent="submitPasswordForm">
                        <v-subheader
                          class="font-weight-medium text-uppercase my-2 my-md-0"
                        >
                          {{ $t('profil.edit.sections.two.title') }}
                        </v-subheader>

                        <v-divider />

                        <v-card-text class="form-body">
                          <v-text-field
                            v-model.trim.lazy="passwordForm.oldPassword"
                            :type="showOldPassword ? 'text' : 'password'"
                            class="mb-2"
                            :label="$t('common.oldPassword')"
                            prepend-icon="mdi-lock-open"
                            :append-icon="
                              showOldPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            autocomplete="current-password"
                            :error-messages="oldPasswordErrors"
                            @click:append="showOldPassword = !showOldPassword"
                            @input="
                              $v.passwordForm.oldPassword.$touch()
                              checkCorrectOldPassword()
                            "
                            @blur="
                              $v.passwordForm.oldPassword.$touch()
                              checkCorrectOldPassword()
                            "
                          ></v-text-field>

                          <v-text-field
                            v-model.trim="passwordForm.newPassword"
                            :type="showNewPassword ? 'text' : 'password'"
                            class="mb-2"
                            :label="$t('common.newPassword')"
                            prepend-icon="mdi-lock"
                            :append-icon="
                              showNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            autocomplete="new-password"
                            :error-messages="newPasswordErrors"
                            @click:append="showNewPassword = !showNewPassword"
                            @input="$v.passwordForm.newPassword.$touch()"
                            @blur="$v.passwordForm.newPassword.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model.trim="passwordForm.confirmNewPassword"
                            :type="showConfirmNewPassword ? 'text' : 'password'"
                            :label="$t('common.confirmNewPassword')"
                            prepend-icon="mdi-lock"
                            :append-icon="
                              showConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            autocomplete="new-password"
                            :error-messages="confirmNewPasswordErrors"
                            @click:append="
                              showConfirmNewPassword = !showConfirmNewPassword
                            "
                            @input="$v.passwordForm.confirmNewPassword.$touch()"
                            @blur="$v.passwordForm.confirmNewPassword.$touch()"
                          ></v-text-field>
                        </v-card-text>

                        <v-divider />

                        <v-card-actions class="mx-2 my-2">
                          <v-spacer />

                          <v-btn
                            color="primary"
                            depressed
                            type="submit"
                            :disabled="disablePasswordFormSubmitButton"
                          >
                            {{ $t('actions.save') }}
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-window-item>

                    <!-- Section 3 -->
                    <v-window-item :value="2">
                      <v-form @submit.prevent="submitPersonalInfoForm">
                        <v-subheader
                          class="font-weight-medium text-uppercase my-2 my-md-0"
                        >
                          {{ $t('profil.edit.sections.three.title') }}
                        </v-subheader>

                        <v-divider />

                        <v-card-text class="form-body">
                          <v-text-field
                            v-model.trim="personalInfoForm.lastname"
                            prepend-icon="mdi-account-box"
                            :label="$t('common.lastname')"
                            class="mb-2"
                            autocomplete="family-name"
                            :maxlength="
                              $v.personalInfoForm.lastname.$params.maxLength.max
                            "
                            :error-messages="lastnameErrors"
                            @input="$v.personalInfoForm.lastname.$touch()"
                            @blur="$v.personalInfoForm.lastname.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model.trim="personalInfoForm.firstname"
                            prepend-icon="mdi-account-box"
                            :label="$t('common.firstname')"
                            class="mb-2"
                            autocomplete="given-name"
                            :maxlength="
                              $v.personalInfoForm.firstname.$params.maxLength
                                .max
                            "
                            :error-messages="firstnameErrors"
                            @input="$v.personalInfoForm.firstname.$touch()"
                            @blur="$v.personalInfoForm.firstname.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model.trim.lazy="personalInfoForm.phoneNumber"
                            v-mask="phoneMask"
                            prepend-icon="mdi-cellphone"
                            :label="$t('common.phoneNumber')"
                            type="tel"
                            class="mb-2"
                            autocomplete="tel-national"
                            :maxlength="11"
                            prefix="+228"
                            :error-messages="phoneNumberErrors"
                            @input="
                              $v.personalInfoForm.phoneNumber.$touch()
                              checkUniquePhoneNumber()
                            "
                            @blur="
                              $v.personalInfoForm.phoneNumber.$touch()
                              checkUniquePhoneNumber()
                            "
                          ></v-text-field>

                          <v-text-field
                            v-model.trim="personalInfoForm.address"
                            prepend-icon="mdi-home-variant"
                            :label="$t('common.address')"
                            autocomplete="street-address"
                            :error-messages="addressErrors"
                            @input="$v.personalInfoForm.address.$touch()"
                            @blur="$v.personalInfoForm.address.$touch()"
                          ></v-text-field>
                        </v-card-text>

                        <v-divider />

                        <v-card-actions class="mx-2 my-2">
                          <v-spacer />

                          <v-btn
                            color="primary"
                            depressed
                            type="submit"
                            :disabled="disablePersonalInfoFormSubmitButton"
                          >
                            {{ $t('actions.save') }}
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-window-item>

                    <!-- Section 4 -->
                    <v-window-item :value="3">
                      <v-form @submit.prevent="submitProfessionalInfoForm">
                        <v-subheader
                          class="font-weight-medium text-uppercase my-2 my-md-0"
                        >
                          {{ $t('profil.edit.sections.four.title') }}
                        </v-subheader>

                        <v-divider />

                        <v-divider />

                        <v-card-actions class="mx-2 my-2">
                          <v-spacer />

                          <v-btn
                            color="primary"
                            depressed
                            type="submit"
                            :disabled="disableProfessionalInfoFormSubmitButton"
                          >
                            {{ $t('actions.save') }}
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-window-item>

                    <!-- Section 5 -->
                    <v-window-item :value="4">
                      <v-form @submit.prevent="submitSocialProfilesForm">
                        <v-subheader
                          class="font-weight-medium text-uppercase my-2 my-md-0"
                        >
                          {{ $t('profil.edit.sections.five.title') }}
                        </v-subheader>

                        <v-divider />

                        <v-card-text class="form-body">
                          <v-text-field
                            v-model.trim.lazy="
                              socialProfilesForm.whatsappNumber
                            "
                            v-mask="phoneMask"
                            prepend-icon="mdi-whatsapp"
                            :label="$t('common.whatsappNumber')"
                            type="tel"
                            class="mb-2"
                            autocomplete="tel-national"
                            :maxlength="11"
                            prefix="+228"
                            :error-messages="whatsappNumberErrors"
                            @input="
                              $v.socialProfilesForm.whatsappNumber.$touch()
                              checkUniqueWhatsappNumber()
                            "
                            @blur="
                              $v.socialProfilesForm.whatsappNumber.$touch()
                              checkUniqueWhatsappNumber()
                            "
                          ></v-text-field>

                          <v-text-field
                            v-model.trim.lazy="socialProfilesForm.facebookLink"
                            prepend-icon="mdi-facebook"
                            :label="$t('common.facebookLink')"
                            autocomplete="off"
                            type="url"
                            class="mb-2"
                            clearable
                            :error-messages="facebookLinkErrors"
                            @input="
                              $v.socialProfilesForm.facebookLink.$touch()
                              checkUniqueFacebookLink()
                            "
                            @blur="
                              $v.socialProfilesForm.facebookLink.$touch()
                              checkUniqueFacebookLink()
                            "
                          ></v-text-field>

                          <v-text-field
                            v-model.trim.lazy="socialProfilesForm.twitterLink"
                            prepend-icon="mdi-twitter"
                            :label="$t('common.twitterLink')"
                            autocomplete="off"
                            type="url"
                            clearable
                            :error-messages="twitterLinkErrors"
                            @input="
                              $v.socialProfilesForm.twitterLink.$touch()
                              checkUniqueTwitterLink()
                            "
                            @blur="
                              $v.socialProfilesForm.twitterLink.$touch()
                              checkUniqueTwitterLink()
                            "
                          ></v-text-field>
                        </v-card-text>

                        <v-divider />

                        <v-card-actions class="mx-2 my-2">
                          <v-spacer />

                          <v-btn
                            color="primary"
                            depressed
                            type="submit"
                            :disabled="disableSocialProfilesFormSubmitButton"
                          >
                            {{ $t('actions.save') }}
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-window-item>
                  </v-window>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  email,
  integer,
  maxLength,
  minLength,
  required,
  sameAs,
  url,
} from 'vuelidate/lib/validators'
import {
  hasLowercase,
  hasUppercase,
  hasNumber,
  phoneRegex,
  usernameRegex,
  isFacebookLink,
  isTwitterLink,
} from '~/helpers/customValidators'
import { debounce, formatPhone, replacePhone } from '~/helpers/helpers.js'

export default {
  data() {
    return {
      selectedSection: 0,
      //   subCategories: [],
      menuOptions: {
        transition: 'slide-y-transition',
      },
      phoneMask: '## ## ## ##',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
      accountForm: {
        username: '',
        email: '',
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      personalInfoForm: {
        lastname: '',
        firstname: '',
        phoneNumber: '',
        address: '',
      },
      professionalInfoForm: {
        jobCategory: null,
        jobSubCategory: null,
      },
      socialProfilesForm: {
        whatsappNumber: '',
        facebookLink: '',
        twitterLink: '',
      },
      isUnique: {
        username: false,
        email: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      },
      isCorrectOldPassword: false,
      isPending: {
        username: false,
        email: false,
        oldPassword: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      },
      isLoaded: {
        username: false,
        email: false,
        oldPassword: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      },
      sections: [
        {
          label: this.$t('profil.edit.sections.one.label'),
          icon: 'mdi-account-circle',
        },
        {
          label: this.$t('profil.edit.sections.two.label'),
          icon: 'mdi-lock',
        },
        {
          label: this.$t('profil.edit.sections.three.label'),
          icon: 'mdi-account-settings',
        },
        {
          label: this.$t('profil.edit.sections.four.label'),
          icon: 'mdi-briefcase-variant',
        },
        {
          label: this.$t('profil.edit.sections.five.label'),
          icon: 'mdi-account-group',
        },
      ],
      dialog: false,
      loading: false,
    }
  },
  //   async fetch() {
  //     try {
  //       if (
  //         this.$store.state.category.categories.length === 0 &&
  //         this.$store.state.category.subCategories.length === 0
  //       ) {
  //         await Promise.all([
  //         //   this.$store.dispatch('category/fetchAllCategories'),
  //         //   this.$store.dispatch('category/fetchAllSubCategories'),
  //         ])
  //       }
  //     } catch (err) {
  //       this.$nuxt.error({
  //         statusCode: 503,
  //         message: 'Unable to fetch data.',
  //       })
  //     }
  //   },
  validations: {
    accountForm: {
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
    },
    passwordForm: {
      oldPassword: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(8),
        hasLowercase,
        hasUppercase,
        hasNumber,
      },
      confirmNewPassword: {
        required,
        sameAsNewPassword: sameAs('newPassword'),
      },
    },
    personalInfoForm: {
      lastname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      firstname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      phoneNumber: {
        required,
        regex: phoneRegex,
      },
      address: {
        required,
        minLength: minLength(4),
      },
    },
    professionalInfoForm: {
      jobCategory: {
        required,
        integer,
      },
      jobSubCategory: {
        required,
        integer,
      },
    },
    socialProfilesForm: {
      whatsappNumber: {
        regex: phoneRegex,
      },
      facebookLink: {
        url,
        valid: isFacebookLink,
      },
      twitterLink: {
        url,
        valid: isTwitterLink,
      },
    },
  },
  computed: {
    disableAccountFormSubmitButton() {
      if (this.$auth.user) {
        const username = this.accountForm.username === this.$auth.user.username
        const useremail = this.accountForm.email === this.$auth.user.email

        return (
          (username && useremail) ||
          !this.isUnique.username ||
          !this.isUnique.email ||
          this.$v.accountForm.$invalid ||
          this.$v.accountForm.$pending
        )
      } else {
        return true
      }
    },
    disablePasswordFormSubmitButton() {
      return (
        this.passwordForm.oldPassword === '' ||
        this.passwordForm.newPassword === '' ||
        this.passwordForm.confirmNewPassword === '' ||
        !this.isCorrectOldPassword ||
        this.$v.passwordForm.$invalid ||
        this.$v.passwordForm.$pending
      )
    },
    disablePersonalInfoFormSubmitButton() {
      if (this.$auth.user) {
        const lastname = this.personalInfoForm.lastname === this.$auth.user.nom
        const firstname =
          this.personalInfoForm.firstname === this.$auth.user.prenom
        const phoneNumber =
          this.personalInfoForm.phoneNumber ===
          formatPhone(this.$auth.user.telephone)
        const address =
          this.personalInfoForm.address === this.$auth.user.adresse

        return (
          (lastname && firstname && phoneNumber && address) ||
          !this.isUnique.phoneNumber ||
          this.$v.personalInfoForm.$invalid ||
          this.$v.personalInfoForm.$pending
        )
      } else {
        return true
      }
    },
    disableProfessionalInfoFormSubmitButton() {
      if (this.$auth.user) {
        // const jobCategory =
        //   this.professionalInfoForm.jobCategory ===
        //   this.$auth.user.sousCategories.categories.idCategorie
        // const jobSubCategory =
        //   this.professionalInfoForm.jobSubCategory ===
        //   this.$auth.user.sousCategories.idSousCategorie

        return (
          this.$v.professionalInfoForm.$invalid ||
          this.$v.professionalInfoForm.$pending
        )
      } else {
        return true
      }
    },
    disableSocialProfilesFormSubmitButton() {
      if (this.$auth.user) {
        // isEdited
        const whatsappNumber =
          this.socialProfilesForm.whatsappNumber ===
          formatPhone(this.$auth.user.whatsapp)
        const facebookLink =
          this.socialProfilesForm.facebookLink === this.$auth.user.facebook
        const twitterLink =
          this.socialProfilesForm.twitterLink === this.$auth.user.tweeter

        // isUnique
        const uniqueWhatsapp = this.socialProfilesForm.whatsappNumber
          ? !!this.isUnique.whatsappNumber
          : true
        const uniqueFacebook = this.socialProfilesForm.facebookLink
          ? !!this.isUnique.facebookLink
          : true
        const uniqueTwitter = this.socialProfilesForm.twitterLink
          ? !!this.isUnique.twitterLink
          : true

        return (
          (whatsappNumber && facebookLink && twitterLink) ||
          !uniqueWhatsapp ||
          !uniqueFacebook ||
          !uniqueTwitter ||
          this.$v.socialProfilesForm.$invalid ||
          this.$v.socialProfilesForm.$pending
        )
      } else {
        return true
      }
    },
    usernameErrors() {
      const errors = []

      if (!this.$v.accountForm.username.$dirty) return errors

      !this.$v.accountForm.username.required &&
        errors.push(this.$t('validations.username.required'))

      !this.$v.accountForm.username.minLength &&
        errors.push(
          this.$t('validations.username.min', {
            length: this.$v.accountForm.username.$params.minLength.min,
          })
        )

      !this.$v.accountForm.username.maxLength &&
        errors.push(
          this.$t('validations.username.max', {
            length: this.$v.accountForm.username.$params.maxLength.max,
          })
        )

      !this.$v.accountForm.username.regex &&
        errors.push(this.$t('validations.username.regex'))

      this.accountForm.username &&
        !this.isPending.username &&
        !this.isUnique.username &&
        errors.push(this.$t('validations.username.unique'))

      return errors
    },
    emailErrors() {
      const errors = []

      if (!this.$v.accountForm.email.$dirty) return errors

      !this.$v.accountForm.email.required &&
        errors.push(this.$t('validations.email.required'))

      !this.$v.accountForm.email.email &&
        errors.push(this.$t('validations.email.email'))

      !this.$v.accountForm.email.maxLength &&
        errors.push(
          this.$t('validations.email.max', {
            length: this.$v.accountForm.email.$params.maxLength.max,
          })
        )

      this.accountForm.email &&
        !this.isPending.email &&
        !this.isUnique.email &&
        errors.push(this.$t('validations.email.unique'))

      return errors
    },
    oldPasswordErrors() {
      const errors = []

      if (!this.$v.passwordForm.oldPassword.$dirty) return errors

      !this.$v.passwordForm.oldPassword.required &&
        errors.push(this.$t('validations.password.required'))

      this.passwordForm.oldPassword &&
        !this.isPending.oldPassword &&
        !this.isCorrectOldPassword &&
        errors.push(this.$t('validations.password.correct'))

      return errors
    },
    newPasswordErrors() {
      const errors = []

      if (!this.$v.passwordForm.newPassword.$dirty) return errors

      !this.$v.passwordForm.newPassword.required &&
        errors.push(this.$t('validations.password.required'))

      !this.$v.passwordForm.newPassword.minLength &&
        errors.push(
          this.$t('validations.password.min', {
            length: this.$v.passwordForm.newPassword.$params.minLength.min,
          })
        )

      !this.$v.passwordForm.newPassword.hasLowercase &&
        errors.push(this.$t('validations.password.lowercase'))

      !this.$v.passwordForm.newPassword.hasUppercase &&
        errors.push(this.$t('validations.password.uppercase'))

      !this.$v.passwordForm.newPassword.hasNumber &&
        errors.push(this.$t('validations.password.number'))

      return errors
    },
    confirmNewPasswordErrors() {
      const errors = []

      if (!this.$v.passwordForm.confirmNewPassword.$dirty) return errors

      !this.$v.passwordForm.confirmNewPassword.required &&
        errors.push(this.$t('validations.confirmPassword.required'))

      !this.$v.passwordForm.confirmNewPassword.sameAsNewPassword &&
        errors.push(this.$t('validations.confirmPassword.confirmed'))

      return errors
    },
    lastnameErrors() {
      const errors = []

      if (!this.$v.personalInfoForm.lastname.$dirty) return errors

      !this.$v.personalInfoForm.lastname.required &&
        errors.push(this.$t('validations.lastname.required'))

      !this.$v.personalInfoForm.lastname.minLength &&
        errors.push(
          this.$t('validations.lastname.min', {
            length: this.$v.personalInfoForm.lastname.$params.minLength.min,
          })
        )

      !this.$v.personalInfoForm.lastname.maxLength &&
        errors.push(
          this.$t('validations.lastname.max', {
            length: this.$v.personalInfoForm.lastname.$params.maxLength.max,
          })
        )

      return errors
    },
    firstnameErrors() {
      const errors = []

      if (!this.$v.personalInfoForm.firstname.$dirty) return errors

      !this.$v.personalInfoForm.firstname.required &&
        errors.push(this.$t('validations.firstname.required'))

      !this.$v.personalInfoForm.firstname.minLength &&
        errors.push(
          this.$t('validations.firstname.min', {
            length: this.$v.personalInfoForm.firstname.$params.minLength.min,
          })
        )

      !this.$v.personalInfoForm.firstname.maxLength &&
        errors.push(
          this.$t('validations.firstname.max', {
            length: this.$v.personalInfoForm.firstname.$params.maxLength.max,
          })
        )

      return errors
    },
    phoneNumberErrors() {
      const errors = []

      if (!this.$v.personalInfoForm.phoneNumber.$dirty) return errors

      !this.$v.personalInfoForm.phoneNumber.required &&
        errors.push(this.$t('validations.phoneNumber.required'))

      !this.$v.personalInfoForm.phoneNumber.regex &&
        errors.push(this.$t('validations.phoneNumber.regex'))

      this.personalInfoForm.phoneNumber &&
        !this.isPending.phoneNumber &&
        !this.isUnique.phoneNumber &&
        errors.push(this.$t('validations.phoneNumber.unique'))

      return errors
    },
    addressErrors() {
      const errors = []

      if (!this.$v.personalInfoForm.address.$dirty) return errors

      !this.$v.personalInfoForm.address.required &&
        errors.push(this.$t('validations.address.required'))

      !this.$v.personalInfoForm.address.minLength &&
        errors.push(
          this.$t('validations.address.min', {
            length: this.$v.personalInfoForm.address.$params.minLength.min,
          })
        )

      return errors
    },
    // jobCategoryErrors() {
    //   const errors = []

    //   if (!this.$v.professionalInfoForm.jobCategory.$dirty) return errors

    //   !this.$v.professionalInfoForm.jobCategory.required &&
    //     errors.push(this.$t('validations.jobCategory.required'))

    //   !this.$v.professionalInfoForm.jobCategory.integer &&
    //     errors.push(this.$t('validations.jobCategory.integer'))

    //   return errors
    // },
    // jobSubCategoryErrors() {
    //   const errors = []

    //   if (!this.$v.professionalInfoForm.jobSubCategory.$dirty) return errors

    //   !this.$v.professionalInfoForm.jobSubCategory.required &&
    //     errors.push(this.$t('validations.jobSubCategory.required'))

    //   !this.$v.professionalInfoForm.jobSubCategory.integer &&
    //     errors.push(this.$t('validations.jobSubCategory.integer'))

    //   return errors
    // },
    whatsappNumberErrors() {
      const errors = []

      if (!this.$v.socialProfilesForm.whatsappNumber.$dirty) return errors

      !this.$v.socialProfilesForm.whatsappNumber.regex &&
        errors.push(this.$t('validations.whatsappNumber.regex'))

      this.socialProfilesForm.whatsappNumber &&
        !this.isPending.whatsappNumber &&
        !this.isUnique.whatsappNumber &&
        errors.push(this.$t('validations.whatsappNumber.unique'))

      return errors
    },
    facebookLinkErrors() {
      const errors = []

      if (!this.$v.socialProfilesForm.facebookLink.$dirty) return errors
      ;(!this.$v.socialProfilesForm.facebookLink.url ||
        !this.$v.socialProfilesForm.facebookLink.valid) &&
        errors.push(this.$t('validations.facebookLink.url'))

      this.socialProfilesForm.facebookLink &&
        !this.isPending.facebookLink &&
        !this.isUnique.facebookLink &&
        errors.push(this.$t('validations.facebookLink.unique'))

      return errors
    },
    twitterLinkErrors() {
      const errors = []

      if (!this.$v.socialProfilesForm.twitterLink.$dirty) return errors
      ;(!this.$v.socialProfilesForm.twitterLink.url ||
        !this.$v.socialProfilesForm.twitterLink.valid) &&
        errors.push(this.$t('validations.twitterLink.url'))

      this.socialProfilesForm.twitterLink &&
        !this.isPending.twitterLink &&
        !this.isUnique.twitterLink &&
        errors.push(this.$t('validations.twitterLink.unique'))

      return errors
    },
    ...mapGetters({
      //   categories: 'category/categoriesAsc',
      //   allSubCategories: 'category/subCategoriesAsc',
    }),
  },
  watch: {
    'accountForm.username'() {
      if (this.isLoaded.username) {
        this.isPending.username = true
        this.isUnique.username = false
      }
      this.isLoaded.username = true
    },
    'accountForm.email'() {
      if (this.isLoaded.email) {
        this.isPending.email = true
        this.isUnique.email = false
      }
      this.isLoaded.email = true
    },
    'passwordForm.oldPassword'() {
      if (this.isLoaded.oldPassword) {
        this.isPending.oldPassword = true
        this.isCorrectOldPassword = false
      }
      this.isLoaded.oldPassword = true
    },
    'personalInfoForm.phoneNumber'() {
      if (this.isLoaded.phoneNumber) {
        this.isPending.phoneNumber = true
        this.isUnique.phoneNumber = false
      }
      this.isLoaded.phoneNumber = true
    },
    'socialProfilesForm.whatsappNumber'() {
      if (this.isLoaded.whatsappNumber) {
        this.isPending.whatsappNumber = true
        this.isUnique.whatsappNumber = false
      }
      this.isLoaded.whatsappNumber = true
    },
    'socialProfilesForm.facebookLink'() {
      if (this.isLoaded.facebookLink) {
        this.isPending.facebookLink = true
        this.isUnique.facebookLink = false
      }
      this.isLoaded.facebookLink = true
    },
    'socialProfilesForm.twitterLink'() {
      if (this.isLoaded.twitterLink) {
        this.isPending.twitterLink = true
        this.isUnique.twitterLink = false
      }
      this.isLoaded.twitterLink = true
    },
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 5 * 60 * 1000) {
      this.$fetch()
    }
  },
  methods: {
    checkUniqueUsername: debounce(
      async function () {
        if (
          this.accountForm.username === '' ||
          this.accountForm.username === null ||
          this.$v.accountForm.username.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUniqueUsernameUpdate(
            this.accountForm.username
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
          this.accountForm.email === '' ||
          this.accountForm.email === null ||
          this.$v.accountForm.email.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUniqueEmailUpdate(
            this.accountForm.email
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
    checkCorrectOldPassword: debounce(
      async function () {
        if (
          this.passwordForm.oldPassword === '' ||
          this.passwordForm.oldPassword === null ||
          this.$v.passwordForm.oldPassword.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUserPassword(
            this.passwordForm.oldPassword
          )
          this.isCorrectOldPassword = result
        } catch (err) {
          this.isCorrectOldPassword = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.oldPassword = false
      },
      500,
      -1
    ),
    checkUniquePhoneNumber: debounce(
      async function () {
        if (
          this.personalInfoForm.phoneNumber === '' ||
          this.personalInfoForm.phoneNumber === null ||
          this.$v.personalInfoForm.phoneNumber.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUniquePhoneNumberUpdate(
            this.personalInfoForm.phoneNumber
          )
          this.isUnique.phoneNumber = !result
        } catch (err) {
          this.isUnique.phoneNumber = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.phoneNumber = false
      },
      500,
      -1
    ),
    checkUniqueWhatsappNumber: debounce(
      async function () {
        if (
          this.socialProfilesForm.whatsappNumber === '' ||
          this.socialProfilesForm.whatsappNumber === null ||
          this.$v.socialProfilesForm.whatsappNumber.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUniqueWhatsappNumberUpdate(
            this.socialProfilesForm.whatsappNumber
          )
          this.isUnique.whatsappNumber = !result
        } catch (err) {
          this.isUnique.whatsappNumber = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.whatsappNumber = false
      },
      500,
      -1
    ),
    checkUniqueFacebookLink: debounce(
      async function () {
        if (
          this.socialProfilesForm.facebookLink === '' ||
          this.socialProfilesForm.facebookLink === null ||
          this.$v.socialProfilesForm.facebookLink.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUniqueFacebookLinkUpdate(
            this.socialProfilesForm.facebookLink
          )
          this.isUnique.facebookLink = !result
        } catch (err) {
          this.isUnique.facebookLink = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.facebookLink = false
      },
      500,
      -1
    ),
    checkUniqueTwitterLink: debounce(
      async function () {
        if (
          this.socialProfilesForm.twitterLink === '' ||
          this.socialProfilesForm.twitterLink === null ||
          this.$v.socialProfilesForm.twitterLink.$invalid
        ) {
          return
        }

        try {
          const result = await this.$api.checkUniqueTwitterLinkUpdate(
            this.socialProfilesForm.twitterLink
          )
          this.isUnique.twitterLink = !result
        } catch (err) {
          this.isUnique.twitterLink = false

          if (!err.response) {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }

        this.isPending.twitterLink = false
      },
      500,
      -1
    ),
    async openDialog() {
      try {
        await this.$auth.fetchUser()
        this.initDialog()
        this.dialog = true
      } catch (err) {
        this.$nuxt.error({
          statusCode: 503,
          message: 'Unable to fetch data.',
        })
      }
    },
    initDialog() {
      this.accountForm = {
        username: this.$auth.user.username,
        email: this.$auth.user.users.email,
      }

      this.personalInfoForm = {
        // lastname: this.$auth.user.users.nom,
        // firstname: this.$auth.user.users.prenom,
        phoneNumber: formatPhone(this.$auth.user.telephone),
        address: this.$auth.user.adresse,
      }

      //   this.setProfessionalInfoForm()

      this.socialProfilesForm = {
        whatsappNumber: formatPhone(this.$auth.user.whatsapp),
        facebookLink: this.$auth.user.facebook,
        twitterLink: this.$auth.user.tweeter,
      }

      this.isUnique = {
        username: !!this.accountForm.username,
        email: !!this.accountForm.email,
        phoneNumber: !!this.personalInfoForm.phoneNumber,
        whatsappNumber: !!this.socialProfilesForm.whatsappNumber,
        facebookLink: !!this.socialProfilesForm.facebookLink,
        twitterLink: !!this.socialProfilesForm.twitterLink,
      }
      this.isLoaded = {
        username: false,
        email: false,
        oldPassword: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      }
    },
    // setProfessionalInfoForm() {
    //   if (this.categories.length > 0 && this.allSubCategories.length > 0) {
    //     this.professionalInfoForm = {
    //       jobCategory: this.$auth.user.sousCategories.categories.idCategorie,
    //       jobSubCategory: this.$auth.user.sousCategories.idSousCategorie,
    //     }

    //     this.subCategories = this.allSubCategories.filter(
    //       (s) =>
    //         s.categories.idCategorie === this.professionalInfoForm.jobCategory
    //     )
    //   }
    // },
    closeDialog() {
      this.dialog = false

      this.isUnique = {
        username: false,
        email: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      }
      this.isCorrectOldPassword = false
      this.isPending = {
        username: false,
        email: false,
        oldPassword: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      }
      this.isLoaded = {
        username: false,
        email: false,
        oldPassword: false,
        phoneNumber: false,
        whatsappNumber: false,
        facebookLink: false,
        twitterLink: false,
      }

      this.$v.accountForm.$reset()
      this.$v.passwordForm.$reset()
      this.$v.personalInfoForm.$reset()
      this.$v.professionalInfoForm.$reset()
      this.$v.socialProfilesForm.$reset()

      this.accountForm = {
        username: '',
        email: '',
      }
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }
      this.personalInfoForm = {
        lastname: '',
        firstname: '',
        phoneNumber: '',
        address: '',
      }
      this.professionalInfoForm = {
        jobCategory: null,
        jobSubCategory: null,
      }
      this.socialProfilesForm = {
        whatsappNumber: '',
        facebookLink: '',
        twitterLink: '',
      }

      //   this.subCategories = []
      this.selectedSection = 0
      this.showOldPassword = false
      this.showNewPassword = false
      this.showConfirmNewPassword = false
      this.loading = false
    },
    // filterSubCategoriesByCategory() {
    //   this.$v.professionalInfoForm.jobCategory.$touch()
    //   this.subCategories = []

    //   if (this.professionalInfoForm.jobSubCategory !== null) {
    //     this.professionalInfoForm.jobSubCategory = null
    //   }

    //   if (!this.$v.professionalInfoForm.jobCategory.$invalid) {
    //     this.subCategories = this.allSubCategories.filter(
    //       (s) =>
    //         s.categories.idCategorie === this.professionalInfoForm.jobCategory
    //     )
    //   }
    // },
    async submitAccountForm() {
      this.$v.accountForm.$touch()

      if (!this.disableAccountFormSubmitButton) {
        this.loading = true

        const userData = {
          username: this.accountForm.username,
          email: this.accountForm.email,
          nom: this.$auth.user.nom,
          //   prenom: this.$auth.user.users.prenom,
          //   telephone: this.$auth.user.telephone,
          adresse: this.$auth.user.adresse,
          numeroEnr: this.$auth.user.numeroEnr,
          //   sousCategories: this.$auth.user.sousCategories.idSousCategorie,
          whatsapp: this.$auth.user.whatsapp,
          facebook: this.$auth.user.facebook,
          tweeter: this.$auth.user.tweeter,
        }

        try {
          await this.$api.updateUserInfos(userData)
          await this.$auth.fetchUser()

          this.$v.accountForm.$reset()
          this.$toast.success(this.$t('common.saved'))
        } catch (err) {
          if (err.response) {
            this.$toast.error(this.$t('common.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
        this.loading = false
      }
    },
    async submitPasswordForm() {
      this.$v.passwordForm.$touch()

      if (!this.disablePasswordFormSubmitButton) {
        this.loading = true

        try {
          await this.$api.updateUserPassword({
            nouveau: this.passwordForm.newPassword,
            ancien: this.passwordForm.oldPassword,
          })
          await this.$auth.logout()

          this.$v.passwordForm.$reset()
          this.passwordForm = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }

          this.$toast.success(this.$t('auth.logInBack'))
          this.$router.push(this.localeLocation('/connexion'))
        } catch (err) {
          if (err.response) {
            this.$toast.error(this.$t('common.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
        this.loading = false
      }
    },
    async submitPersonalInfoForm() {
      this.$v.personalInfoForm.$touch()

      if (!this.disablePersonalInfoFormSubmitButton) {
        this.loading = true

        const telephone = replacePhone(this.personalInfoForm.phoneNumber)

        const userData = {
          username: this.$auth.user.username,
          email: this.$auth.user.email,
          //   nom: this.personalInfoForm.lastname,
          //   prenom: this.personalInfoForm.firstname,
          telephone,
          adresse: this.personalInfoForm.address,
          numeroEnr: this.$auth.user.numeroEnr,
          //   sousCategories: this.$auth.user.sousCategories.idSousCategorie,
          whatsapp: this.$auth.user.whatsapp,
          facebook: this.$auth.user.facebook,
          tweeter: this.$auth.user.tweeter,
        }

        try {
          await this.$api.updateUserInfos(userData)
          await this.$auth.fetchUser()

          this.$v.personalInfoForm.$reset()
          this.$toast.success(this.$t('common.saved'))
        } catch (err) {
          if (err.response) {
            this.$toast.error(this.$t('common.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
        this.loading = false
      }
    },
    async submitProfessionalInfoForm() {
      this.$v.professionalInfoForm.$touch()

      if (!this.disableProfessionalInfoFormSubmitButton) {
        this.loading = true

        const userData = {
          username: this.$auth.user.username,
          email: this.$auth.user.email,
          //   nom: this.$auth.user.users.nom,
          //   prenom: this.$auth.user.users.prenom,
          telephone: this.$auth.user.telephone,
          adresse: this.$auth.user.adresse,
          numeroEnr: this.$auth.user.numeroEnr,
          //   sousCategories: this.professionalInfoForm.jobSubCategory,
          whatsapp: this.$auth.user.whatsapp,
          facebook: this.$auth.user.facebook,
          tweeter: this.$auth.user.tweeter,
        }

        try {
          await this.$api.updateUserInfos(userData)
          await this.$auth.fetchUser()

          this.$v.professionalInfoForm.$reset()
          this.$toast.success(this.$t('common.saved'))
        } catch (err) {
          if (err.response) {
            this.$toast.error(this.$t('common.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
        this.loading = false
      }
    },
    async submitSocialProfilesForm() {
      this.$v.socialProfilesForm.$touch()

      if (!this.disableSocialProfilesFormSubmitButton) {
        this.loading = true
        let whatsapp, facebook, twitter

        if (this.socialProfilesForm.whatsappNumber === '') {
          whatsapp = null
        } else {
          whatsapp = replacePhone(this.socialProfilesForm.whatsappNumber)
        }

        if (this.socialProfilesForm.facebookLink === '') {
          facebook = null
        } else {
          facebook = this.socialProfilesForm.facebookLink
        }

        if (this.socialProfilesForm.twitterLink === '') {
          twitter = null
        } else {
          twitter = this.socialProfilesForm.twitterLink
        }

        const userData = {
          username: this.$auth.user.username,
          email: this.$auth.user.email,
          //   nom: this.$auth.user.users.nom,
          //   prenom: this.$auth.user.users.prenom,
          telephone: this.$auth.user.telephone,
          adresse: this.$auth.user.adresse,
          numeroEnr: this.$auth.user.numeroEnr,
          //   sousCategories: this.$auth.user.sousCategories.idSousCategorie,
          whatsapp,
          facebook,
          tweeter: twitter,
        }

        try {
          await this.$api.updateUserInfos(userData)
          await this.$auth.fetchUser()

          this.$v.socialProfilesForm.$reset()
          this.$toast.success(this.$t('common.saved'))
        } catch (err) {
          if (err.response) {
            this.$toast.error(this.$t('common.errorOccured'))
          } else {
            this.$nuxt.error({
              statusCode: 503,
              message: 'Unable to fetch data.',
            })
          }
        }
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.dialog-body {
  background-color: #f0f2f5;
}

.form-body {
  min-height: 335px;
}
</style>
