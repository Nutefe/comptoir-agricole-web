import sitemapRoutes from "./helpers/sitemap.js";

const SITE_NAME = "COMPTOIRE AGRICOLE";
const SITE_DESC = `agricole`;
const HOST = "";

// Development
// const API_BASE_URL = "http://localhost:8091/web/service";

// Production
const API_BASE_URL = "https://shopymanager.com:8443/agro_bourse/web/service";


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    titleTemplate: '%s - agroBourse',
    title: 'agroBourse',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.jpg' },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
      },],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vuelidate.js",
    "~/plugins/vmask.js",
    "~/plugins/vue-advanced-cropper.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    "vue-social-sharing/nuxt",
    "vue-toastification/nuxt",
    "vue-sweetalert2/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  // Moment
  moment: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/scss/variables.scss"],
    defaultAssets: false,
    optionsPath: "~/vuetify/options.js",
    treeShake: true,
  },

  // Google Fonts module
  googleFonts: {
    families: {
      Poppins: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  // PWA
  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: "default",
      name: SITE_NAME,
      author: "GBEZE Kofi Nutefe",
      description: SITE_DESC,
      theme_color: "#0b7557",
      lang: "fr",
      ogHost: HOST,
      ogImage: `${HOST}/icon.jpg`,
      twitterCard: "summary_large_image",
    },
    manifest: {
      name: SITE_NAME,
      short_name: SITE_NAME,
      description: SITE_DESC,
      background_color: "#f0f2f5",
      lang: "fr",
    },
  },

  // Nuxt-i18n module
  i18n: {
    baseUrl: HOST,
    locales: [{ code: "fr", iso: "fr", name: "Français", file: "fr.js" }],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "fr",
    vueI18n: {
      fallbackLocale: "fr",
    },
    detectBrowserLanguage: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: API_BASE_URL,
    timeout: 10000,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  },

  // Auth module
  auth: {
    plugins: ["~/plugins/api.js", "~/plugins/auth.js"],
    redirect: {
      login: "/connexion",
      logout: "/",
      callback: "/connexion",
      home: "/profil",
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "accessToken",
          maxAge: 900,
          type: "Bearer",
        },
        refreshToken: {
          property: "refreshToken",
          data: "refreshToken",
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { url: "/auth/signin", method: "post" },
          refresh: { url: "/auth/refreshtoken", method: "post" },
          user: { url: "/users/me", method: "get" },
          logout: false,
        },
        autoLogout: false,
      },
    },
  },

  // Vue Toastification
  toast: {
    maxToasts: 5,
    transition: "Vue-Toastification__fade",
    timeout: 3000,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
  },

  // SweetAlert
  sweetalert: {
    confirmButtonColor: "#0fa379",
    denyButtonColor: "#FF5252",
  },

  // Robots
  robots: {
    UserAgent: "*",
    Disallow: "/profil",
    Sitemap: `${HOST}/sitemap.xml`,
  },

  // Sitemap
  sitemap: {
    hostname: HOST,
    gzip: true,
    i18n: {
      locales: ["fr"],
      routesNameSeparator: "___",
    },
    exclude: ["/profil", "/profil/**"],
    routes: async () => await sitemapRoutes(API_BASE_URL),
    defaults: {
      lastmod: new Date(),
      changefreq: "monthly",
      priority: 0.6,
    },
  },

  build: {
    postcss: null,

  },

  router: {
    // middleware: ["auth"],
  },

  server: {
    port: 3011,
  },
}
