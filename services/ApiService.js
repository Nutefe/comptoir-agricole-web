
export default ($axios, $auth) => ({

    /**
     * start users axios api
     */

    getUserConnect() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/users/me`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveUser(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/user`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUser(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/user/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveUserAdmin(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/user/admin`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUserAdmin(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/user/admin/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveUserAgregateur(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/user/agregateur`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUserAgregateur(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/user/agregateur/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveUserExploitant(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/user/exploitant`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUserExploitant(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/user/exploitant/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePasswordUserConnect(user) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/update/password/connect`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePasswordUser(user, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/update/password/${id}`, user, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateUserAvatar(data) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/user/avatar`, data, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    checkUsername(username) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/username/${username}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserUsernameUpdate(username, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/username/update/${id}/${username}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserCennectUsernameUpdate(username) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/username/update/${username}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserUsernameAuth(username) {
        return $axios.$get(`/auth/check/username/${username}`);
    },

    checkEmail(email) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/email/${email}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserEmailUpdate(email, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/email/update/${id}/${email}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserCennectEmailUpdate(email) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/email/update/${email}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserEmailAuth(email) {
        return $axios.$get(`/auth/check/email/${email}`);
    },

    checkTel(tel) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/tel/${tel}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserTelUpdate(tel, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/tel/update/${id}/${tel}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserCennectTelUpdate(tel) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/tel/update/${tel}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkUserTelAuth(tel) {
        return $axios.$get(`/auth/check/tel/${tel}`);
    },

    selectOneUser(id) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllUser() {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },
    selectAllUserPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllUserPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllUserAdminPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users/admin/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllUserAdminPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users/admin/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },


    selectAllUserClientPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users/client/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllUserClientPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/users/client/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },


    deleteAccount(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    // --------------------- AUTH -------------
    saveUserAuthExploitant(user) {
        return $axios.$post(`/auth/signin/up/exploitant`, user);
    },
    saveUserAuthSimple(user) {
        return $axios.$post(`/auth/signin/up`, user);
    },
    /**
     * end users axios api
     */

    /**
     * start role axios api
     */
    selectOneRole(id) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/role/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllRole() {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/roles`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllRoleAdminClient() {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/roles/admin/client`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllRolePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/roles/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllRolePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/roles/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveRole(role) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/role`, role, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateRole(role, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/role/${id}`, role, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end role axios api
     */

    /**
     * start categorie axios api
     */

    getCategorie(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/categorie/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllCategories() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/categories`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getTopCategories() {
        // if (!$auth.loggedIn) {
        //     return;
        // }

        return $axios.$get(`/auth/categories/top/7`, {
            // headers: {
            //     Authorization: `Bearer ${$auth.token}`,
            // },
        });
    },
    getAuthCategories() {
        // if (!$auth.loggedIn) {
        //     return;
        // }

        return $axios.$get(`/auth/categories`, {
            // headers: {
            //     Authorization: `Bearer ${$auth.token}`,
            // },
        });
    },

    selectAllCategoriePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/categories/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllCategoriePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/categories/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveCategorie(categorie) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/categorie`, categorie, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateCategorie(categorie, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/categorie/${id}`, categorie, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    saveCategorieFile(categorie) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/categorie/file`, categorie, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateCategorieFile(categorie, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/categorie/file/${id}`, categorie, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    /**
     * end categorie axios api
     */

    /**
     * start type speculation axios api
     */

    getTypeSpeculation(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/type/speculation/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllTypeSpeculations() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/type/speculations`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllTypeSpeculationPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/type/speculations/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllTypeSpeculationPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/type/speculations/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveTypeSpeculation(typeSpeculation) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/type/speculation`, typeSpeculation, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateTypeSpeculation(typeSpeculation, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/type/speculation/${id}`, typeSpeculation, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end type speculation axios api
     */

    /**
     * start region axios api
     */

    getRegion(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/region/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllRegions() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/regions`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllRegionPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/regions/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllRegionPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/regions/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveRegion(region) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/region`, region, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateRegion(region, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/region/${id}`, region, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end region axios api
     */

    /**
     * start ville axios api
     */

    getVille(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/ville/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllVilles() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/villes`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getAllVillePays(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/villes/pays/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllVillePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/villes/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllVillePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/villes/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveVille(ville) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/ville`, ville, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateVille(ville, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/ville/${id}`, ville, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    // --------------  AUTH -------------------

    getAllAuthVilles() {
        return $axios.$get(`/auth/villes`);
    },

    getAllAuthVillePays(id) {
        return $axios.$get(`/auth/villes/pays/${id}`);
    },

    /**
     * end ville axios api
     */

    /**
     * start pays axios api
     */

    getPays(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/pays/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllPays() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/pays`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllPaysPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/pays/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllPaysPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/pays/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    savePays(pays) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/pays`, pays, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updatePays(pays, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/pays/${id}`, pays, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    checkNom(nom) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/nom/${nom}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkNomUpdate(nom, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/nom/update/${id}/${nom}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkCode(code) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/check/code/${code}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    checkCodeUpdate(code, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/check/code/update/${id}/${code}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    // ------------- AUTH ---------------
    getAllAuthPays() {
        return $axios.$get(`/auth/pays`);
    },
    /**
     * end pays axios api
     */

    /**
     * start mode paiement axios api
     */

    getModePaiement(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/mode/paiement/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllModePaiements() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/mode/paiements`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllModePaiementPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/mode/paiements/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllModePaiementPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/mode/paiements/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveModePaiement(modePaiement) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/mode/paiement`, modePaiement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateModePaiement(modePaiement, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/mode/paiement/${id}`, modePaiement, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end mode paiement axios api
     */

    /**
     * start magasin axios api
     */

    getMagasin(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/magasin/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllMagasins() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/magasins`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllMagasinPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/magasins/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllMagasinPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/magasins/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveMagasin(magasin) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/magasin`, magasin, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateMagasin(magasin, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/magasin/${id}`, magasin, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end magasin axios api
     */

    /**
     * start produit axios api
     */

    getProduit(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/produit/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllProduits() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/produits`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    getTopProduits() {
        // if (!$auth.loggedIn) {
        //     return;
        // }
        return $axios.$get(`/auth/produits/top/10`, {
            // headers: {
            //     Authorization: `Bearer ${$auth.token}`,
            // },
        });
    },
    getAuthProduits() {
        return $axios.$get(`/auth/produits`);
    },
    

    selectAllProduitPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/produits/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllProduitPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/produits/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveProduit(produit) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/produit`, produit, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateProduit(produit, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/produit/${id}`, produit, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    /**
     * end produit axios api
     */

    /**
     * start agregateur axios api
     */

    getAgregateur(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/agregateur/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllAgregateur() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/agregateurs`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllAgregateurPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/agregateurs/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllAgregateurPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/agregateurs/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    /**
     * end agregateur axios api
     */

    /**
     * start exploitant axios api
     */

    getExploitant(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/exploitant/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllExploitant() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/exploitants`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllExploitantPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/exploitants/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllExploitantPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/exploitants/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    /**
     * end exploitant axios api
     */

    /**
     * start speculation axios api
     */

    getSpeculation(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/speculation/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllSpeculations() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/speculations`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllSpeculationPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllSpeculationPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllSpeculationUserConnectPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/user/connect/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllSpeculationUserConnectPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/user/connect/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllSpeculationExpPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/type/exploitant/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllSpeculationExpPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/type/exploitant/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllSpeculationAgrPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/type/agregateur/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllSpeculationAgrPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/type/agregateur/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllSpeculationRegionPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/type/exploitant/region/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllSpeculationRegionPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/type/exploitant/region/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllSpeculationUserPage(id, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/user/page/${id}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllSpeculationUserPage(id, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/speculations/user/search/page/${id}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveSpeculationAgregateur(speculation) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/speculation/agregateur`, speculation, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateSpeculationAgregateur(speculation, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/speculation/agregateur/${id}`, speculation, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    saveSpeculationExploitant(speculation) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/speculation/exploitant`, speculation, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateSpeculationExploitant(speculation, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/speculation/exploitant/${id}`, speculation, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },
    enableSpeculation(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/speculation/valide/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },
    // ------------------------ AUTH ----------

    getAllAuthSpeculations() {
        return $axios.$get(`/auth/speculations/type/agregateur/top/page/1`);
    },

    selectAllAuthSpeculationAgrPage(page) {
        return $axios.$get(`/auth/speculations/type/agregateur/page/${page}`)
    },

    searchAllAuthSpeculationAgrPage(page, s) {
        return $axios.$get(`/auth/speculations/type/agregateur/search/page/${page}/${s}`)
    },

    selectAllAuthSpeculationValidePage(page) {
        return $axios.$get(`/auth/speculations/valide/page/${page}`)
    },

    searchAllAuthSpeculationValidePage(page, s) {
        return $axios.$get(`/auth/speculations/valide/search/page/${page}/${s}`)
    },

    selectAllAuthSpeculationCatValidePage(id, page) {
        return $axios.$get(`/auth/speculations/valide/categorie/page/${id}/${page}`)
    },

    searchAllAuthSpeculationCatValidePage(id, page, s) {
        return $axios.$get(`/auth/speculations/valide/categorie/search/page/${id}/${page}/${s}`)
    },

    /**
     * end speculation axios api
     */


    /**
     * start commande axios api
     */

    getCommande(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/commande/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllCommande() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/commandes`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllCommandePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllCommandePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllCommandeUserConnectPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/user/connect/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllCommandeUserConnectPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/user/connect/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },


    selectAllCommandeUserPage(id, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/user/page/${id}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllCommandeUserPage(id, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/user/search/page/${id}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllCommandeProduitPage(id, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/produit/page/${id}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllCommandeProduitPage(id, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/commandes/produit/search/page/${id}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    saveCommande(commande) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/commande`, commande, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    updateCommande(commande, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/commande/${id}`, commande, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end commande axios api
     */

    /**
     * start demande axios api
     */

    getDemande(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/demande/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    getAllDemandes() {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/demandes`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    selectAllDemandePage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/demandes/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllDemandePage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/demandes/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDemandeUserConnectPage(page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/demandes/user/connect/page/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllDemandeUserConnectPage(page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/demandes/user/connect/search/page/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDemandeUserPage(id, page) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/demandes/user/page/${id}/${page}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    searchAllDemandeUserPage(id, page, s) {
        if (!$auth.loggedIn) {
            return;
        }
        return $axios.$get(`/demandes/user/search/page/${id}/${page}/${s}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            }
        })
    },

    selectAllDemandeValidePage(page) {
        
        return $axios.$get(`/auth/demandes/valide/page/${page}`)
    },

    searchAllDemandeValidePage(page, s) {
        
        return $axios.$get(`/auth/demandes/valide/search/page/${page}/${s}`)
    },

    saveDemande(demande) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$post(`/demande`, demande, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateDemande(demande, id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$put(`/demande/${id}`, demande, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },

    enableDemande(id) {
        if (!$auth.loggedIn) {
            return;
        }

        return $axios.$get(`/demande/valide/${id}`, {
            headers: {
                Authorization: `Bearer ${$auth.token}`,
            },
        });
    },

    /**
     * end demande axios api
     */


});
