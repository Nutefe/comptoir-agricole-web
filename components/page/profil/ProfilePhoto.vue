<template>
  <v-container>
    <v-row align="center" justify="center">
      <div class="user-avatar">
        <v-avatar size="150" class="avatar__border">
          <v-img
            :src="avatar"
            :alt="fullname"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-avatar>

        <v-avatar
          v-ripple
          size="40"
          color="#E4E6EB"
          class="icon"
          @click.stop="launchAvatarPicker"
        >
          <v-icon>mdi-camera</v-icon>
        </v-avatar>
      </div>

      <v-file-input
        ref="avatarUpload"
        accept="image/png, image/jpeg"
        prepend-icon="mdi-camera"
        hide-input
        hide-details
        class="d-none"
        @change="openDialog"
      ></v-file-input>
    </v-row>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        persistent
        scrollable
        max-width="650"
      >
        <v-card :disabled="loading" :loading="loading">
          <v-card-title class="px-3 px-md-5 py-2 py-md-3">
            <v-row align="center">
              <v-col cols="9">
                <span class="text-h6 text-md-h5 font-weight-regular">
                  {{ $t('profil.photo.update') }}
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

          <v-card-text class="px-3 px-md-5 pt-3 pb-2">
            <v-container class="px-0 fill-height">
              <v-row align="center">
                <v-col cols="12">
                  <div class="profile-cropper-wrapper">
                    <div
                      v-if="image.src"
                      class="cropper__wrapper__background"
                    ></div>

                    <v-progress-circular
                      v-if="image.loading"
                      :size="70"
                      color="primary"
                      indeterminate
                      class="cropper__loader"
                    ></v-progress-circular>

                    <cropper
                      v-if="image.src"
                      ref="cropper"
                      :src="image.src"
                      class="cropper__class"
                      background-class="cropper__background"
                      foreground-class="cropper__foreground"
                      image-restriction="stencil"
                      stencil-component="circle-stencil"
                      :stencil-props="{
                        lines: {},
                        handlers: {},
                        movable: false,
                        scalable: false,
                        aspectRatio: 1,
                      }"
                      :transitions="false"
                      :canvas="{
                        minHeight: 128,
                        minWidth: 128,
                        maxHeight: 256,
                        maxWidth: 256,
                      }"
                      :default-size="defaultSize"
                      :stencil-size="stencilSize"
                      :debounce="false"
                      :min-width="150"
                      :min-height="150"
                      @ready="ready"
                      @error="error"
                      @change="onChange"
                    ></cropper>
                  </div>
                </v-col>

                <v-col cols="12" class="text-center py-0">
                  <CropperZoomSlider :zoom="zoom" @change="onZoom" />
                </v-col>
              </v-row>
            </v-container>
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

              <v-btn color="primary" depressed @click="saveImage">
                {{ $t('commoin.actions.save') }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import CropperZoomSlider from '~/components/CropperZoomSlider.vue'

export default {
  components: {
    CropperZoomSlider,
  },
  props: {
    fullname: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      maxImageSize: 5 * 1024 * 1024,
      validImageTypes: ['image/jpeg', 'image/png'],
      image: {
        src: null,
        type: null,
        loading: false,
      },
      zoom: 0,
      dialog: false,
      loading: false,
    }
  },
  computed: {
    avatar() {
      if (this.$auth.user) {
        return `http://localhost:8081/web/service/downloadFile/${this.$auth.user.avatar}` || '/img/avatar.png'
      } else {
        return ''
      }
    },
  },
  watch: {
    'image.src'(value) {
      if (value) this.image.loading = true
    },
  },
  destroyed() {
    if (this.image.src) URL.revokeObjectURL(this.image.src)
  },
  methods: {
    launchAvatarPicker() {
      this.$refs.avatarUpload.$refs.input.click()
    },
    openDialog(file) {
      if (file) {
        if (!this.validImageTypes.includes(file.type)) {
          this.$swal({
            icon: 'error',
            text: this.$t('validations.photo.type'),
          })
        } else if (file.size > this.maxImageSize) {
          this.$swal({
            icon: 'error',
            text: this.$t('validations.photo.size', {
              size: this.maxImageSize / 1024 / 1024,
            }),
          })
        } else {
          if (this.image.src) URL.revokeObjectURL(this.image.src)

          const blob = URL.createObjectURL(file)
          const reader = new FileReader()

          reader.onload = () => {
            this.image = {
              src: blob,
              type: file.type,
            }
          }

          reader.readAsArrayBuffer(file)

          this.dialog = true
        }

        this.$refs.avatarUpload.$refs.input.value = null
      }
    },
    closeDialog() {
      this.dialog = false
      this.image = {
        src: null,
        type: null,
        loading: false,
      }
      this.zoom = 0
      this.loading = false
    },
    ready() {
      this.image.loading = false
    },
    error() {
      this.closeDialog()
      this.$toast.success(this.$t('common.errorOccured'))
    },
    defaultSize({ imageSize }) {
      return {
        width: Math.min(imageSize.height, imageSize.width),
        height: Math.min(imageSize.height, imageSize.width),
      }
    },
    stencilSize({ boundaries }) {
      return {
        width: Math.min(boundaries.height, boundaries.width),
        height: Math.min(boundaries.height, boundaries.width),
      }
    },
    onZoom(value) {
      const cropper = this.$refs.cropper

      if (cropper) {
        if (cropper.imageSize.height < cropper.imageSize.width) {
          const minHeight = cropper.sizeRestrictions.minHeight

          cropper.zoom(
            ((1 - this.zoom) * cropper.imageSize.height + minHeight) /
              ((1 - value) * cropper.imageSize.height + minHeight)
          )
        } else {
          const minWidth = cropper.sizeRestrictions.minWidth

          cropper.zoom(
            ((1 - this.zoom) * cropper.imageSize.width + minWidth) /
              ((1 - value) * cropper.imageSize.width + minWidth)
          )
        }
      }
    },
    onChange() {
      const cropper = this.$refs.cropper

      if (cropper) {
        const { coordinates, imageSize } = cropper

        if (
          imageSize.width / imageSize.height >
          coordinates.width / coordinates.height
        ) {
          this.zoom =
            (cropper.imageSize.height - cropper.coordinates.height) /
            (cropper.imageSize.height - cropper.sizeRestrictions.minHeight)
        } else {
          this.zoom =
            (cropper.imageSize.width - cropper.coordinates.width) /
            (cropper.imageSize.width - cropper.sizeRestrictions.minWidth)
        }
      }
    },
    saveImage() {
      const { canvas } = this.$refs.cropper.getResult()

      if (canvas) {
        this.loading = true

        canvas.toBlob((blob) => {
          this.uploadImage(blob)
        }, this.image.type)
      }
    },
    async uploadImage(avatar) {
      try {
        const formData = new FormData()
        formData.append('avatar', avatar, avatar.name)

        await this.$api.updateUserAvatar(formData)
        await this.$auth.fetchUser()

        this.closeDialog()
        this.$toast.success(this.$t('profil.photo.saved'))
      } catch (err) {
        this.loading = false

        if (err.response) {
          this.$toast.error(this.$t('common.errorOccured'))
        } else {
          this.$nuxt.error({
            statusCode: 503,
            message: 'Unable to fetch data.',
          })
        }
      }
    },
  },
}
</script>

<style scoped>
.user-avatar {
  display: inline-block;
  position: relative;
}

.icon {
  position: absolute;
  top: 103px;
  left: 103px;
  cursor: pointer;
  z-index: 1;
}
</style>
