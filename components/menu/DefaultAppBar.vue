<template>
  <v-app-bar id="navBar" color="#f0f0f0" app elevate-on-scroll>
    <template v-if="$vuetify.breakpoint.mobile">
      <v-app-bar-nav-icon
        class="mr-n2 secondary--text"
        :aria-label="$t('drawer.open')"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title class="secondary--text">{{
        $t('brand.title')
      }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn min-width="130" color="secondary" rounded dark
        ><v-icon color="white">mdi-magnify</v-icon><v-spacer
      /></v-btn>
    </template>

    <template v-else>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-container class="pa-0 px-md-4 fill-height" fluid>
            <!-- Title -->
            <v-toolbar-title class="px-0">
              <nuxt-link :to="localePath('/')">
                <v-avatar :size="$vuetify.breakpoint.smAndDown ? 30 : 40">
                  <v-img src="/icon.jpg" :alt="$t('brand.title')" />
                </v-avatar>

                <span
                  class="secondary--text text-subtitle-1 text-md-h6 font-weight-medium mr-2"
                >
                  {{ $t('brand.title') }}
                </span>
              </nuxt-link>
            </v-toolbar-title>

            <v-spacer />

            <v-btn
              v-for="route in simpleRoutes"
              :key="`${route.title}-header-regular-route`"
              nuxt
              outlined
              rounded
              class="secondary--text mr-1"
              active-class="green--text"
              :to="localePath(route.path)"
            >
              {{ route.title }}
            </v-btn>

            <v-btn
              v-if="isAdmin"
              id="admin"
              outlined
              rounded
              class="secondary--text mr-1"
              active-class="green--text"
            >
              {{ adminRoutes.title }}
            </v-btn>
            <v-menu
              activator="#admin"
              bottom
              attach="#navBar"
              right
              offset-y
              origin="top right"
              transition="slide-y-transition"
              active-class="primary--text"
              rounded="xl"
              content-class="elevation-4"
              nudge-bottom="5"
              :close-on-content-click="false"
            >
              <v-list>
                <template v-for="item in adminRoutes.paths">
                  <v-menu
                    :key="`item-${item.title}`"
                    transition="slide-x-transition"
                    open-on-hover
                    offset-x
                    rounded="xl"
                    content-class="elevation-4"
                    nudge-right="5"
                  >
                    <template #activator="{ on, attrs }">
                      <v-list-item v-bind="attrs" :title="item.title" v-on="on">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.title }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-icon small> mdi-chevron-right </v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </template>

                    <v-card>
                      <v-list outlined nav dense>
                        <v-list-item
                          v-for="subItem in item.paths"
                          :key="`subItem-${subItem.title}`"
                          color="primary"
                          :to="localePath(subItem.path)"
                          nuxt
                        >
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ subItem.title }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </template>
              </v-list>
            </v-menu>

            <!-- Avatar -->
            <v-btn
              id="avatar"
              class="ml-2"
              height="35"
              width="35"
              icon
              :aria-label="$t('profil.title')"
            >
              <v-avatar size="35">
                <v-img
                  :src="avatar"
                  :alt="fullname"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template #placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        v-if="isLogin"
                        indeterminate
                        color="grey lighten-5"
                      />
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </v-btn>

            <!-- Dropdown -->
            <v-menu
              content-class="mt-1"
              activator="#avatar"
              bottom
              attach="#navBar"
              left
              offset-y
              :close-on-content-click="false"
              origin="top center 0"
              transition="slide-y-transition"
            >
              <v-card>
                <template v-if="isLogin">
                  <v-list width="320" nav>
                    <v-list-item
                      class="no-active"
                      :to="localePath(profileRoute.path)"
                      nuxt
                    >
                      <v-list-item-avatar size="70">
                        <v-img
                          :src="avatar"
                          :alt="fullname"
                          aspect-ratio="1"
                          class="grey lighten-2"
                        >
                          <template #placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                              />
                            </v-row>
                          </template>
                        </v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          class="text-subtitle-1 font-weight-medium my-1"
                          >{{ fullname }}</v-list-item-title
                        >

                        <v-list-item-subtitle>{{
                          profileRoute.subtitle
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                      class="no-active"
                      :to="localePath(speculation.path)"
                      nuxt
                    >
                      <v-list-item-icon class="mr-3">
                        <v-icon>{{ speculation.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          speculation.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="isAgregateur || isAdmin"
                      class="no-active"
                      :to="localePath(speculationAg.path)"
                      nuxt
                    >
                      <v-list-item-icon class="mr-3">
                        <v-icon>{{ speculationAg.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          speculationAg.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider class="my-2" />

                    <v-list-item @click="logoutUser">
                      <v-list-item-icon class="mr-3">
                        <v-icon>{{ logout.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          logout.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </template>
                <template v-else>
                  <v-list width="320" nav>
                    <v-list-item
                      class="no-active"
                      :to="localePath(login.path)"
                      nuxt
                    >
                      <v-list-item-icon class="mr-3">
                        <v-icon>{{ login.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ login.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <!-- <v-list-item @click="openSiginUpDialog">
                      <v-list-item-icon class="mr-3">
                        <v-icon>{{ siginup.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          siginup.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="openSiginUpExpDialog">
                      <v-list-item-icon class="mr-3">
                        <v-icon>{{ siginupExp.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          siginupExp.title
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item> -->
                  </v-list>
                </template>
              </v-card>
            </v-menu>
          </v-container>
        </v-col>
      </v-row>
    </template>
  </v-app-bar>
</template>

<script>
import { mixinAppBar } from '~/mixins/mixinAppBar.js'
import { mixinRoles } from '~/mixins/mixinRoles.js'

export default {
  mixins: [mixinAppBar, mixinRoles],

  data() {
    return {}
  },
}
</script>
