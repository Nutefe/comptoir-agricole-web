<template>
  <!-- User Authenticated -->
  <v-navigation-drawer v-model="drawer" app left temporary>
    <template #prepend>
      <!-- Close Drawer -->
      <v-toolbar flat>
        <v-toolbar-title class="px-0">
          <span
            class="black--text text-subtitle-1 text-md-h6 font-weight-medium mr-2"
          >
            {{ $t('brand.title') }}
          </span>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          class="mr-n2"
          :aria-label="$t('drawer.close')"
          icon
          @click.stop="closeDrawer"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <!-- Logout -->
    <template v-if="isLogin" #append>
      <v-divider />
      <v-list nav>
        <v-list-item
          two-line
          nuxt
          class="no-active"
          :to="localePath(profileRoute.path)"
        >
          <v-list-item-avatar size="35">
            <v-img
              :src="avatar"
              alt="fullname"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1 font-weight-medium mb-1">
              {{ fullname }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ profileRoute.subtitle }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="pa-2">
        <v-btn block depressed color="primary" @click.stop="logoutUser">
          {{ logout.title }}
        </v-btn>
      </div>
    </template>

    <v-divider />

    <!-- Routes -->
    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="route in simpleRoutes"
          :key="`${route.title}-drawer-route`"
          :to="localePath(route.path)"
          nuxt
        >
          <v-list-item-action class="mr-3">
            <v-icon left>{{ route.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider />
    <v-list v-if="isLogin">
      <v-list-group
        v-for="item in adminRoutes.paths"
        :key="`${item.title}-drawer-route`"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="ite in item.paths"
          :key="`${ite.title}-drawer-route`"
          :to="localePath(ite.path)"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>{{ ite.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider />

    <v-list shaped>
      <template v-if="!isLogin">
        <v-list-item class="no-active" :to="localePath(login.path)" nuxt>
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
            <v-list-item-title>{{ siginup.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openSiginUpExpDialog">
          <v-list-item-icon class="mr-3">
            <v-icon>{{ siginupExp.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ siginupExp.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mixinDrawer } from '~/mixins/mixinDrawer.js'
import { mixinRoles } from '~/mixins/mixinRoles.js'

export default {
  mixins: [mixinDrawer, mixinRoles],
  methods: {
    closeDrawer() {
      this.$store.dispatch('toggleDrawer', false)
    },
  },
}
</script>
