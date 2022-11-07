<template>
  <div>
    <template v-if="previewImages.length > 0">
      <v-row dense class="mt-2 mb-1">
        <v-col
          v-for="(image, index) in previewImages"
          :key="`${index}-${image.name}-preview`"
          cols="6"
          sm="3"
        >
          <!-- Images preview -->
          <v-card class="fill-height" flat>
            <v-hover>
              <template #default="{ hover }">
                <!-- Image -->
                <v-img :src="image.name" height="100" class="grey lighten-2">
                  <template #placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>

                  <!-- Overlay -->
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute>
                      <v-btn
                        icon
                        :aria-label="$t('commoin.actions.delete')"
                        @click.stop="removeImage(image.id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
          </v-card>
        </v-col>

        <v-col v-if="previewImages.length < maxFileCount" cols="6" sm="3">
          <!-- Add new image -->
          <v-card
            class="fill-height"
            color="grey lighten-2"
            flat
            min-height="90"
          >
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-btn
                icon
                :aria-label="$t('commoin.actions.add')"
                @click.stop="$refs.dropzoneFileInput.$refs.input.click()"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <!-- Drag & drop -->
      <v-card
        outlined
        class="mt-4 mb-1"
        :class="{
          'grey lighten-3': dragover,
          'red lighten-4': hasError,
          'grey lighten-4': !hasError,
        }"
        :style="
          hasError && !dragover
            ? 'border: 2px dashed #FF5252 !important;'
            : 'border: 2px dashed #707070 !important;'
        "
        @click.stop="$refs.dropzoneFileInput.$refs.input.click()"
        @drop.prevent="onDrop"
        @dragover.prevent="dragover = true"
        @dragenter.prevent="dragover = true"
        @dragleave.prevent="dragover = false"
      >
        <v-card-text>
          <v-row
            class="d-flex flex-column"
            dense
            align="center"
            justify="center"
          >
            <v-icon
              class="my-1"
              :class="{
                'error--text': hasError && !dragover,
              }"
              size="50"
            >
              mdi-cloud-upload-outline
            </v-icon>

            <p
              class="text-center font-weight-medium"
              :class="{
                'error--text': hasError && !dragover,
              }"
            >
              {{ $t('commoin.images.choose') }}
            </p>
          </v-row>
        </v-card-text>
      </v-card>
    </template>

    <!-- Messages container -->
    <div
      v-show="hasError || availableFileCount > 0"
      class="drag-n-drop__error-container mb-1"
    >
      <v-slide-y-transition>
        <p v-show="hasError" class="error--text text-caption">
          {{ imagesErrorMessage }}
        </p>
      </v-slide-y-transition>

      <span v-show="!hasError && availableFileCount > 0" class="text-caption">
        {{
          $t('commoin.images.hint', {
            length: availableFileCount,
            size: maxFileSize / 1024 / 1024,
          })
        }}
      </span>
    </div>

    <!-- File input -->
    <v-file-input
      ref="dropzoneFileInput"
      accept="image/png, image/jpeg"
      multiple
      hide-input
      hide-details
      class="d-none"
      @change="loadImages"
    ></v-file-input>
  </div>
</template>

<script>
import { cloneDeep } from '~/helpers/helpers.js'

export default {
  name: 'DropZone',
  props: {
    initialOldImages: {
      type: Array,
      default: null,
    },
    maxFileCount: {
      type: Number,
      default: 4,
    },
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10 Mo
    },
  },
  data() {
    return {
      dragover: false,
      newImages: [],
      currentOldImages: this.initialOldImages
        ? cloneDeep(this.initialOldImages)
        : [],
      ids: [],
      imagesErrorMessage: null,
      validImageTypes: ['image/jpeg', 'image/png'],
    }
  },
  computed: {
    hasError() {
      return this.imagesErrorMessage !== null
    },
    availableFileCount() {
      return (
        this.maxFileCount - this.currentOldImages.length - this.newImages.length
      )
    },
    isOldImageRemoved() {
      if (this.initialOldImages) {
        return this.initialOldImages.length !== this.currentOldImages.length
      } else {
        return false
      }
    },
    previewImages() {
      return this.currentOldImages.concat(this.newImages)
    },
  },
  watch: {
    newImages: {
      handler() {
        this.imagesPicked()
      },
      deep: true,
    },
    currentOldImages: {
      handler() {
        this.imagesPicked()
      },
      deep: true,
    },
  },
  methods: {
    onDrop(e) {
      this.dragover = false
      this.loadImages(e.dataTransfer.files)
    },
    loadImages(files) {
      if (files.length === 0) {
        if (this.newImages.length === 0) {
          this.imagesErrorMessage = this.$t('validations.images.min')
        }
      } else if (files.length > this.availableFileCount) {
        this.imagesErrorMessage = this.$t('validations.images.max', {
          length: this.availableFileCount,
        })
      } else if (this.isImagesSizesValid(files)) {
        if (this.isImagesTypesValid(files)) {
          this.imagesErrorMessage = null
          const time = new Date().getTime()

          files.forEach((img, index) => {
            if (!this.isImageDuplicated(img)) {
              const reader = new FileReader()

              this.ids.push({
                id: Number(`-${index + time}`),
                action: 1,
              })

              reader.onload = (event) => {
                this.newImages.push({
                  id: Number(`-${index + time}`),
                  name: event.target.result,
                  image: img,
                })
              }
              reader.readAsDataURL(img)
            }
          })
        } else {
          this.imagesErrorMessage = this.$t('validations.images.type')
        }
      } else {
        this.imagesErrorMessage = this.$t('validations.images.size', {
          size: this.maxFileSize / 1024 / 1024,
        })
      }

      this.$refs.dropzoneFileInput.$refs.input.value = null
    },
    imagesPicked() {
      const imagesCount = this.maxFileCount - this.availableFileCount

      this.$emit('imagesPicked', {
        valid: imagesCount !== 0,
        count: imagesCount,
      })
    },
    isImagesSizesValid(images) {
      const isSizeInvalid = (img) => img.size > this.maxFileSize

      return !images.some(isSizeInvalid)
    },
    isImagesTypesValid(images) {
      const isTypeInvalid = (img) => !this.validImageTypes.includes(img.type)

      return !images.some(isTypeInvalid)
    },
    isImageDuplicated(image) {
      const isPresent = (elm) =>
        elm.image.name === image.name &&
        elm.image.type === image.type &&
        elm.image.size === image.size

      return this.newImages.some(isPresent)
    },
    removeImage(imgId) {
      let runOnce = false

      if (this.initialOldImages) {
        this.currentOldImages = this.currentOldImages.filter((img) => {
          if (img.id === imgId) {
            this.ids.push({ id: img.id, action: 0 })
            runOnce = true
            return false
          } else {
            return true
          }
        })
      }

      if (!runOnce) {
        this.newImages = this.newImages.filter((img) => {
          if (img.id === imgId) {
            this.ids = this.ids.filter((elm) => elm.id !== img.id)
            return false
          } else {
            return true
          }
        })
      }

      if (this.currentOldImages.length === 0 && this.newImages.length === 0) {
        this.imagesErrorMessage = this.$t('validations.images.min')
      }
    },
    formatImagesIds() {
      let ids = cloneDeep(this.ids)

      if (this.isOldImageRemoved) {
        const imagesRemovedCount =
          this.initialOldImages.length - this.currentOldImages.length
        let count = 1

        if (imagesRemovedCount <= this.newImages.length) {
          // Changing removed images action to 1 => updated
          ids = ids.map((elm) => {
            if (elm.action === 0) elm.action = 1
            return elm
          })

          // Removing new images ids
          ids = ids.filter((elm) => {
            if (elm.id < 0 && count <= imagesRemovedCount) {
              count++
              return false
            } else {
              return true
            }
          })
        } else {
          // Changing removed images action to 1 => updated
          count = 1
          ids = ids.map((elm) => {
            if (elm.action === 0 && count <= this.newImages.length) {
              count++
              elm.action = 1
            }
            return elm
          })

          // Removing new images ids
          count = 1
          ids = ids.filter((elm) => {
            if (elm.id < 0 && count <= this.newImages.length) {
              count++
              return false
            } else {
              return true
            }
          })
        }
      }

      // Setting new images id to 0
      ids = ids.map((elm) => {
        if (elm.id < 0) elm.id = 0
        return elm
      })

      return ids
    },
    images() {
      if (
        this.isOldImageRemoved &&
        this.currentOldImages.length === 0 &&
        this.newImages.length === 0
      ) {
        this.imagesErrorMessage = this.$t('validations.images.min')
        return null
      } else {
        const ids = this.formatImagesIds()
        const images = this.newImages.map((elm) => elm.image)

        return {
          ids,
          images,
        }
      }
    },
    reset() {
      this.dragover = false
      this.newImages = []
      this.currentOldImages = []
      this.ids = []
      this.imagesErrorMessage = null
    },
  },
}
</script>

<style scoped>
.drag-n-drop__error-container {
  height: 20px;
}
</style>
