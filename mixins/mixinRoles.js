import { startCase } from "~/helpers/helpers.js";

export const mixinRoles = {

  computed: {

    avatar() {
      if (this.$auth.user) {
        return `${this.$axios.defaults.baseURL}/downloadFile/${this.$auth.user.avatar}` || "/img/avatar.png";
      } else {
        return "";
      }
    },


    fullname() {
      if (this.$auth.user) {
        const title = `${this.$auth.user.username} `;
        return startCase(title);
      } else {
        return "";
      }
    },

    isAdmin() {
      if (this.$auth.user) {
        if (this.$auth.user.role.id === 1) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    isAgregateur() {
      if (this.$auth.user) {
        if (this.$auth.user.role.id === 2) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    isExploitant() {
      if (this.$auth.user) {
        if (this.$auth.user.role.id === 3) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    isClient() {
      if (this.$auth.user) {
        if (this.$auth.user.role.id === 4) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
};
