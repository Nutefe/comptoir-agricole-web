<template>
    <div class="cropper-navigation">
        <div class="cropper-navigation__wrapper">
            <v-btn
                icon
                small
                class="mr-5"
                :aria-label="$t('actions.zoomOut')"
                @click="zoomOut"
            >
                <v-icon>mdi-minus</v-icon>
            </v-btn>

            <div
                ref="line"
                class="cropper-navigation__line-wrapper"
                @mousedown="onStart"
                @touchstart="onStart"
            >
                <div class="cropper-navigation__line">
                    <div
                        class="cropper-navigation__fill"
                        :style="{
                            flexGrow: zoom,
                        }"
                    ></div>
                    <div
                        class="cropper-navigation__circle"
                        :class="{ 'cropper-navigation__circle--focus': focus }"
                        :style="{
                            left: `${zoom * 100}%`,
                        }"
                    >
                        <div
                            class="cropper-navigation__inner-circle"
                            :class="{
                                'cropper-navigation__inner-circle--focus':
                                    focus,
                            }"
                        ></div>
                    </div>
                </div>
            </div>

            <v-btn
                icon
                small
                class="ml-5"
                :aria-label="$t('actions.zoomIn')"
                @click="zoomIn"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        zoom: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            focus: false,
        };
    },
    mounted() {
        window.addEventListener("mouseup", this.onStop, { passive: false });
        window.addEventListener("mousemove", this.onDrag, { passive: false });
        window.addEventListener("touchmove", this.onDrag, { passive: false });
        window.addEventListener("touchend", this.onStop, { passive: false });
    },
    destroyed() {
        window.removeEventListener("mouseup", this.onStop);
        window.removeEventListener("mousemove", this.onDrag);
        window.removeEventListener("touchmove", this.onDrag);
        window.removeEventListener("touchend", this.onStop);
    },
    methods: {
        onDrag(e) {
            if (this.focus) {
                const position = e.touches ? e.touches[0].clientX : e.clientX;
                const line = this.$refs.line;

                if (line) {
                    const { left, width } = line.getBoundingClientRect();
                    this.$emit(
                        "change",
                        Math.min(1, Math.max(0, position - left) / width)
                    );
                }

                if (e.preventDefault) e.preventDefault();
            }
        },
        onStop() {
            this.focus = false;
        },
        onStart(e) {
            this.focus = true;
            this.onDrag(e);
        },
        zoomIn() {
            this.$emit("change", this.zoom + 0.1);
        },
        zoomOut() {
            this.$emit("change", this.zoom - 0.1);
        },
    },
};
</script>

<style scoped>
.cropper-navigation {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 50px;
}

.cropper-navigation__wrapper {
    display: flex;
    align-items: center;
    max-width: 400px;
    width: 100%;
}

.cropper-navigation__line-wrapper {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
}

.cropper-navigation__line {
    background: #9e9e9e;
    height: 2px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    position: relative;
    align-items: center;
}

.cropper-navigation__fill {
    background: #0b7557;
    align-self: stretch;
    flex-basis: auto;
    flex-direction: column;
    flex-shrink: 0;
}

.cropper-navigation__circle {
    width: 30px;
    height: 30px;
    margin-left: -15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition-duration: 0.5s;
    transition-property: background-color, box-shadow;
    background-color: transparent;
}

.cropper-navigation__circle:hover {
    background-color: rgba(11, 117, 87, 0.3);
}

.cropper-navigation__circle--focus {
    background-color: rgba(11, 117, 87, 0.3);
}

.cropper-navigation__inner-circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #0b7557;
    transform: scale(1);
    transition-duration: 0.2s;
    transition-property: transform;
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 7px,
        rgba(101, 119, 134, 0.15) 0px 1px 3px 1px;
}

.cropper-navigation__inner-circle--focus {
    transform: scale(1.2);
}
</style>
