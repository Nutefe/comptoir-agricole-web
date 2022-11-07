export default {
    // Project
    brand: {
        title: "COMPTOIR AGRICOLE",
        description: "Mini projet de gestion"
    },

    // Navigation Drawer
    navDrawer: {
        dashboard: "Tableau de bord",
        shops: "Boutiques",
        users: "Utilisateurs",
    },

    // Navigation Drawer
    navigation: {
        accueil: "Accueil",
        dashboard: "Dashboard",
        user: {
            title: "Users",
            admin: "Admins",
            agregateur: "Agregateurs",
            exploitant: "Exploitants",
            client: "Clients",
            role: "Roles",
        },
        localite: {
            title: "Localites",
            pays: "Pays",
            region: "Regions",
            ville: "Villes",
        },
        parametre: {
            title: "Configuration",
            magasin: "Magasins",
            categorie: "Categories",
            produit: "Produits",
            modePaiement: "Mode paiements",
            typeSpeculation: "Type speculations",
        },
        speculation: {
            title: "Speculations",
            agregateur: "Mes speculations",
            exploitant: "Speculations exploitants",
        },
        profil: "Profile",
    },

    // Connexion
    logins: {
        login: "Connexion",
        logout: "Deconnexion",
        accessDenied: "Accès refusé vous n'avez pas l'autorisation pour accéder à cette application",
        success: "Connexion effectuer avec succès.",
        loginFailed: "Nom d'utilisateur ou mot de passe incorrect.",
        loggedOut: "Déconnexion effectuer avec succès.",
        errorOccured: "Une erreur est survenue lors de la connexion.",
    },

    // Déconnexion
    logout: {
        action: "Déconnexion",
        message: "Prêt à quitter ?",
        loggedOut: "Déconnexion effectuer avec succès.",
    },

    drawer: {
        open: "Ouvrir le tiroir de navigation",
        close: "Fermer le tiroir de navigation",
    },

    // Navigation Bar
    navbar: {
        home: "Accueil",
        actualites: "Actualités",
        artisans: "Artisans",
        metiers: "Métiers",
        login: "Se Connecter",
        register: "S'Inscrire",
        search: "Recherche",
    },

    search: {
        title: "Recherche",
        placeholder: "Rechercher des artisans...",
        emptyQuery: "En attente de votre recherche !",
        results: "0 résultat | {count} résultat | {count} résultats",
    },

    // Profil
    profil: {
        title: "Mon profil",
        subtitle: "Voir votre profil",
        accountDisabledMessage: `
            <p style="margin-bottom: 10px;">Votre compte étant désactivé, vous ne pouvez pas faire de publications.</p>
            <p>Veuillez contacter la CRM-LOMÉ afin de procéder à l'activation de votre compte.</p>
        `,
        edit: {
            title: "Éditer le profil",
            sections: {
                one: {
                    title: "Éditer vos infos de compte",
                    label: "Infos du compte",
                },
                two: {
                    title: "Changer votre mot de passe",
                    label: "Mot de passe",
                },
                three: {
                    title: "Éditer vos infos personnelles",
                    label: "Infos personnelles",
                },
                four: {
                    title: "Éditer vos infos professionnelles",
                    label: "Infos professionnelles",
                },
                five: {
                    title: "Éditer vos profils sociaux",
                    label: "Profils sociaux",
                },
            },
        },
        photo: {
            update: "Mettre à jour la photo de profil",
            saved: "Photo de profil mis à jour avec succès.",
        },
    },

    connexion: {
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        login: "Connexion",
        newAccount: "Vous n'avez pas de compte ?  ",
        signUp: "S'inscrire",
        signUpExp: "Nous rejoindre",
        signUpExp1: "Rejoindre les exploitants",
        forgetPassword: "Mot de passe oublié?",
        sigin: "Se connecter",
        msg: "Rejoignez gratuitement le comptoire agricole",
        msg1: "Inscrivez-vous gratuitement pour bénéficier des avantages exceptionnels du comptoire agricole",
        msg2: "Joignez-vous aux exploitant pour bénéficier des avantages du comptoire agricole",
        cc: "Suivant",
    },

    siginup: {
        username: "Nom d'utilisateur",
        email: "Email",
        surname: "Nom",
        password: "Mot de passe",
        save: "Valider",
        account: "Vous avez un compte ?",
        sigin: "Se connecter",
        forgetPassword: "Mot de passe oublié?"
    },

    password: {
        back: "Retour",
        send: "Envoyer",
        message: "Entrez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe",
        newPassword: "Nouveu mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        email: "Votre email",
    },

    dashboard: {
        recette: "Recettes",
        depense: "Depenses",
        banque: "Banques",
        caisse: "Caisses",
    },

    user: {
        title: "Utilisateurs",
        new: "Nouveau utilisateur crm",
        edit: "Modifier un utilisateur",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            username: "Nom d'utilisateur",
            email: "Email",
            nom: "Nom",
            prenom: "Prenom",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            crm: "Crm",
            profil: "Profil",
        },
        table: {
            num: "N°",
            username: "Nom d'utilisateur",
            email: "Email",
            nom: "Nom",
            prenom: "Prenom",
            ccom: "Ccom",
            profil: "Profil",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },
    admin: {
        title: "Utilisateurs admin",
        new: "Nouveau utilisateur admin",
        edit: "Modifier un utilisateur admin",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            pays: "Pays de residense",
        },
        table: {
            num: "N°",
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            action: "Action",
            per_page: "Admin par page",
            page_text: "de",
        },
    },

    client: {
        title: "Utilisateurs client",
        new: "Nouveau utilisateur client",
        edit: "Modifier un utilisateur client",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            pays: "Pays de residense",
        },
        table: {
            num: "N°",
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            action: "Action",
            per_page: "Admin par page",
            page_text: "de",
        },
    },

    exploitant: {
        title: "Utilisateurs exploitant",
        new: "Nouveau utilisateur exploitant",
        edit: "Modifier un utilisateur exploitant",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone personnel",
            nom: "Nom",
            prenom: "Prenom",
            adresse: "Adresse personnel",
            adresseCo: "Adresse cooperative",
            telephoneCo: "Numero de telephone cooperative",
            longitude: "Longitude",
            latitude: "Latitude",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            pays: "Pays de residense",
        },
        table: {
            num: "N°",
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone personnel",
            nom: "Nom",
            prenom: "Prenom",
            adresse: "Adresse personnel",
            adresseCo: "Adresse cooperative",
            telephoneCo: "Numero de telephone cooperative",
            longitude: "Longitude",
            latitude: "Latitude",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            action: "Action",
            per_page: "Admin par page",
            page_text: "de",
        },
    },

    agregateur: {
        title: "Utilisateurs agregateur",
        new: "Nouveau utilisateur agregateur",
        edit: "Modifier un utilisateur agregateur",
        update: "Modifier",
        search: "Recherche...",
        subtitle: "Voir votre profil",
        form: {
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone personnel",
            nom: "Nom",
            prenom: "Prenom",
            entreprise: "Entreprise",
            adresse: "Adresse personnel",
            magasin: "Magasins",
            longitude: "Longitude",
            latitude: "Latitude",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            pays: "Pays de residense",
        },
        table: {
            num: "N°",
            username: "Nom d'utilisateur",
            email: "Email",
            telephone: "Numero de telephone personnel",
            nom: "Nom",
            prenom: "Prenom",
            entreprise: "Entreprise",
            adresse: "Adresse personnel",
            magasin: "Magasins",
            longitude: "Longitude",
            latitude: "Latitude",
            password: "Mot de passe",
            confirmPassword: "Confirmer votre mot de passe",
            role: "Role",
            ville: "Ville de residense",
            action: "Action",
            per_page: "Admin par page",
            page_text: "de",
        },
    },

    categorie: {
        title: "Categories",
        new: "Nouvelle categorie",
        edit: "Modifier une categorie",
        update: "Modifier",
        search: "Recherche...",
        all:"Toutes les categories",
        form: {
            libelle: "Libelle",
        },
        table: {
            num: "N°",
            libelle: "Libelle",
            action: "Action",
            per_page: "Comptes decodeurs par page",
            page_text: "de",
        },
    },

    modePaiement: {
        title: "Mode de paiement",
        new: "Nouveau mode de paiement",
        edit: "Modifier un mode de paiement",
        update: "Modifier",
        search: "Recherche...",
        form: {
            libelle: "Libelle",
        },
        table: {
            num: "N°",
            libelle: "Libelle",
            action: "Action",
            per_page: "Mode de paiement par page",
            page_text: "de",
        },
    },

    magasin: {
        title: "Magasins",
        new: "Nouveau magasin",
        edit: "Modifier un magasin",
        update: "Modifier",
        search: "Recherche...",
        form: {
            nom: "Nom",
            adresse: "Adresse",
            telephone: "Numero telephone",
        },
        table: {
            num: "N°",
            nom: "Nom",
            adresse: "Adresse",
            telephone: "Numero telephone",
            action: "Action",
            per_page: "Mode de paiement par page",
            page_text: "de",
        },
    },

    produit: {
        title: "Produits",
        new: "Nouveau produit",
        edit: "Modifier un produit",
        update: "Modifier",
        search: "Recherche...",
        form: {
            designation: "Designation",
            categorie: "Categorie",
            image: "Image",
        },
        table: {
            num: "N°",
            designation: "Designation",
            categorie: "Categorie",
            action: "Action",
            per_page: "Mode de paiement par page",
            page_text: "de",
        },
    },

    pays: {
        title: "Pays",
        new: "Nouveau pays",
        edit: "Modifier un pays",
        update: "Modifier",
        search: "Recherche...",
        form: {
            nom: "Nom",
            code: "Code",
            indicatif: "Indicatif",
        },
        table: {
            num: "N°",
            nom: "Nom",
            code: "Code",
            indicatif: "Indicatif",
            action: "Action",
            per_page: "Pays par page",
            page_text: "de",
        },
    },

    region: {
        title: "Regions",
        new: "Nouvelle region",
        edit: "Modifier une region",
        update: "Modifier",
        search: "Recherche...",
        form: {
            nom: "Nom",
            pays: "Pays",
        },
        table: {
            num: "N°",
            nom: "Nom",
            pays: "Pays",
            action: "Action",
            per_page: "Regions par page",
            page_text: "de",
        },
    },

    ville: {
        title: "Villes",
        new: "Nouvelle ville",
        edit: "Modifier une ville",
        update: "Modifier",
        search: "Recherche...",
        form: {
            nom: "Nom",
            region: "Region",
        },
        table: {
            num: "N°",
            nom: "Nom",
            region: "Region",
            action: "Action",
            per_page: "Villes par page",
            page_text: "de",
        },
    },

    speculation: {
        title: "Speculations",
        new: "Nouveau speculation",
        edit: "Modifier un speculation",
        update: "Modifier",
        search: "Recherche...",
        etat: "Etat du stock",
        form: {
            produit: "Produit",
            superficie: "Superficie",
            supNonExploite: "Superficie non exploitee",
            stockSpontane: "Stock spontane",
            stockPrevisionnel: "Stock previsionnel",
            exploitant: "Exploitant",
            magasin: "Magasins",
            mode: "Mode de paiement",
            besoin: "Besoin",
            images: "Images",
            description: "Description",
        },
        table: {
            num: "N°",
            produit: "Produit",
            superficie: "Superficie",
            supNonExploite: "Superficie non exploitee",
            stockSpontane: "Stock spontane",
            stockPrevisionnel: "Stock previsionnel",
            exploitant: "Exploitant",
            magasin: "Magasins",
            mode: "Mode de paiement",
            besoin: "Besoin",
            description: "Description",
            action: "Action",
            per_page: "Mode de paiement par page",
            page_text: "de",
        },
    },

    commoin: {
        title: "Commoins",
        search: "Recherche...",
        add: "Ajouter",
        actions: {
            yes: "Oui",
            no: "Non",
            cancel: "Annuler",
            close: "Fermer",
            delete: "Supprimer",
            disable: "Désactiver",
            enable: "Activer",
            create: "Creer",
            edit: "Éditer",
            add: "Ajouter",
            finish: "Terminer",
            save: "Enregistrer",
            submit: "Valider",
            showImages: "Afficher les images",
            downloadAttachment: "Telecharger",
        },

        images: {
            choose: "Glissez et déposez vos images ici ou cliquez pour les sélectionner",
            hint: "Au plus {length} image(s) de moins de {size} Mo chacune.",
        },

        saved: "Enregistré avec succès.",
        noData: "Aucune donnée disponible",
        errorOccured: "Une erreur est survenue. Veuillez réessayer.",
        copyright: "Blue`Rizon tous droits réservés",

    },

    // Error Page
    error: {
        pageNotFound: "Page introuvable",
        pageNotFoundMessage:
            "La page que vous recherchez est temporairement indisponible.",
        otherError: "Erreur inattendue",
        otherErrorMessage: "Une erreur inattendue s'est produite.",
    },

    validations: {
        username: {
            required: "Le nom d'utilisateur est obligatoire.",
            min: "Le nom d'utilisateur doit contenir au moins {length} caractères.",
            max: "Le nom d'utilisateur doit contenir au plus {length} caractères.",
            regex: "Ce nom d'utilisateur n'est pas valide.",
            unique: "Ce nom d'utilisateur n'est pas disponible.",
        },
        nom: {
            required: "Le nom est obligatoire.",
            min: "Le nom doit contenir au moins {length} caractères.",
            max: "Le nom doit contenir au plus {length} caractères.",
            regex: "Ce nom n'est pas valide.",
            unique: "Ce nom n'est pas disponible.",
        },
        prenom: {
            required: "Le nom est obligatoire.",
            min: "Le nom doit contenir au moins {length} caractères.",
            max: "Le nom doit contenir au plus {length} caractères.",
            regex: "Ce nom n'est pas valide.",
            unique: "Ce nom n'est pas disponible.",
        },
        email: {
            required: "L'adresse email est obligatoire.",
            email: "Cette adresse email n'est pas valide.",
            max: "L'adresse email doit contenir au plus {length} caractères.",
            unique: "Cette adresse email est déjà utilisée.",
        },
        password: {
            required: "Le mot de passe est obligatoire.",
            correct: "Le mot de passe n'est pas correct.",
            min: "Le mot de passe doit comporter au moins {length} caractères.",
            lowercase:
                "Le mot de passe doit contenir au moins une lettre minuscule.",
            uppercase:
                "Le mot de passe doit contenir au moins une lettre majuscule.",
            number: "Le mot de passe doit contenir au moins un chiffre.",
            special:
                "Le mot de passe doit contenir au moins un caractère spécial.",
        },
        confirmPassword: {
            required: "Veuillez confirmer le mot de passe.",
            confirmed: "Le mot de passe ne correspond pas.",
        },

        profil: {
            required: "Le profil est obligatoire.",
        },
        numero: {
            required: "Le numero est obligatoire.",
            unique: "Ce numero n'est pas disponible.",
            min: "Le numero doit contenir au moins {length} caractères.",
            max: "Le numero doit contenir au plus {length} caractères.",
            exist: "Ce numero decodeur n'existe pas",
        },

        telephone: {
            required: "Le numero telephone est obligatoire.",
            unique: "Ce numero telephone n'est pas disponible.",
            min: "Le numero telephone doit contenir au moins {length} caractères.",
            max: "Le numero telephone doit contenir au plus {length} caractères.",
            regex: "Ce numéro de téléphone n'est pas valide.",
        },

        adresse: {
            required: "L'adresse est obligatoire.",
            min: "L'adresse doit contenir au moins {length} caractères.",
            max: "L'adresse doit contenir au plus {length} caractères.",
        },

        code: {
            required: "Le code est obligatoire.",
            unique: "Ce code n'est pas disponible.",
            min: "Le code doit contenir au moins {length} caractères.",
            max: "Le code doit contenir au plus {length} caractères.",
        },

        libelle: {
            required: "Le libelle est obligatoire.",
            min: "Le libelle doit contenir au moins {length} caractères.",
            max: "Le libelle doit contenir au plus {length} caractères.",
        },
        price: {
            required: "Le prix est obligatoire.",
            min: "Le prix doit contenir au moins {length} caractères.",
            max: "Le prix doit contenir au plus {length} caractères.",
        },
        montant: {
            required: "Le montant est obligatoire.",
            min: "Le montant  doit contenir au moins {length} caractères.",
            max: "Le montant  doit contenir au plus {length} caractères.",
        },
        codePays: {
            required: "Le code pays est obligatoire.",
            min: "Le code pays  doit contenir au moins {length} caractères.",
            max: "Le code pays doit contenir au plus {length} caractères.",
        },

        description: {
            required: "La description est obligatoire.",
            min: "Le description  doit contenir au moins {length} caractères.",
            max: "Le description doit contenir au plus {length} caractères.",
        },

        designation: {
            required: "La designation est obligatoire.",
            min: "Le designation  doit contenir au moins {length} caractères.",
            max: "Le designation doit contenir au plus {length} caractères.",
        },

        categorie: {
            required: "La categorie est obligatoire.",
        },

        images: {
            min: "Veuillez choisir au moins une image.",
            max: "Veuillez choisir au plus {length} image(s).",
            type: "Veuillez choisir des images au format: .png, .jpg ou .jpeg.",
            size: "Veuillez choisir des images de taille inférieure à {size} Mo chacune.",
        },

        pays: {
            required: "Le pays est obligatoire.",
        },

        region: {
            required: "La region est obligatoire.",
        },

        ville: {
            required: "La ville est obligatoire.",
        },

        magasin: {
            required: "Le magasin est obligatoire.",
        },

        entreprise: {
            required: "L'entreprise est obligatoire.",
            min: "L'entreprise  doit contenir au moins {length} caractères.",
            max: "L'entreprise doit contenir au plus {length} caractères.",
        },

        produit: {
            required: "Le magasin est obligatoire.",
        },

        superficie: {
            required: "La superficie est obligatoire.",
            min: "La superficie  doit contenir au moins {length} caractères.",
            max: "La superficie doit contenir au plus {length} caractères.",
        },


        supNonExploite: {
            required: "La superficie nom exploitee est obligatoire.",
            min: "La superficie nom exploitee  doit contenir au moins {length} caractères.",
            max: "La superficie nom exploitee doit contenir au plus {length} caractères.",
        },

        stockSpontane: {
            required: "Le stock spontane est obligatoire.",
            min: "Le stock spontane  doit contenir au moins {length} caractères.",
            max: "Le stock spontane doit contenir au plus {length} caractères.",
        },
        stockPrevisionnel: {
            required: "Le stock previsionnel est obligatoire.",
            min: "Le stock previsionnel  doit contenir au moins {length} caractères.",
            max: "Le stock previsionnel doit contenir au plus {length} caractères.",
        },

        exploitant: {
            required: "L'exploitant' est obligatoire.",
        },
        mode: {
            required: "Le mode de paiement est obligatoire.",
            min: "Le mode de paiement  doit contenir au moins {length} caractères.",
            max: "Le mode de paiement doit contenir au plus {length} caractères.",
        },
        besoin: {
            required: "Le besoin est obligatoire.",
            min: "Le besoin  doit contenir au moins {length} caractères.",
            max: "Le besoin doit contenir au plus {length} caractères.",
        },
    },
}