import axios from "axios";

export default async (apiBaseUrl) => {
    /* ----- Accueil ----- */
    const homePage = {
        url: `/`,
        links: [{ lang: "fr", url: `/` }],
        lastmod: new Date(),
        changefreq: "daily",
        priority: 1,
    };

    /* ----- Actualites ----- */
    const { data: actualitesData } = await axios.get(
        `${apiBaseUrl}/auth/actualites_not_deleted_auth`
    );

    const actualitesByIdPages = [];
    const mostRecentActualite = actualitesData
        .map((actu) => {
            actualitesByIdPages.push({
                url: `/actualites/${actu.idActualite}`,
                links: [{ lang: "fr", url: `/actualites/${actu.idActualite}` }],
                lastmod: actu.updatedAt,
                changefreq: "weekly",
                priority: 0.8,
            });

            return actu.updatedAt;
        })
        .sort((date1, date2) => (date1 < date2 ? 1 : -1))[0];

    const actualitesPage = {
        url: `/actualites`,
        links: [{ lang: "fr", url: `/actualites` }],
        lastmod: mostRecentActualite,
        changefreq: "daily",
        priority: 1,
    };

    /* ----- Artisans ----- */
    const { data: artisansData } = await axios.get(
        `${apiBaseUrl}/auth/artisans_not_deleted_auth`
    );

    const realisationsByIdPages = [];
    const artisansByIdPages = [];
    const artisansDates = [];

    for (const art of artisansData) {
        artisansDates.push(art.updatedAt);

        /* ----- Realisations by artisans ----- */
        const { data: realisationsData } = await axios.get(
            `${apiBaseUrl}/auth/realisations_art_auth/${art.idArtisan}`
        );

        const realisationsDates = realisationsData.map((r) => {
            realisationsByIdPages.push({
                url: `/artisans/${r.realisations.artisans.users.username}/realisations/${r.realisations.idRealisation}`,
                links: [
                    {
                        lang: "fr",
                        url: `/artisans/${r.realisations.artisans.users.username}/realisations/${r.realisations.idRealisation}`,
                    },
                ],
                lastmod: r.realisations.updatedAt,
                changefreq: "weekly",
                priority: 0.8,
            });

            return r.realisations.updatedAt;
        });

        realisationsDates.push(art.updatedAt);
        const mostRecentRealisation = realisationsDates.sort((date1, date2) =>
            date1 < date2 ? 1 : -1
        )[0];

        artisansByIdPages.push({
            url: `/artisans/${art.users.username}`,
            links: [{ lang: "fr", url: `/artisans/${art.users.username}` }],
            lastmod: mostRecentRealisation,
            changefreq: "weekly",
            priority: 0.8,
        });
    }

    const mostRecentArtisan = artisansDates.sort((date1, date2) =>
        date1 < date2 ? 1 : -1
    )[0];

    const artisansPage = {
        url: `/artisans`,
        links: [{ lang: "fr", url: `/artisans` }],
        lastmod: mostRecentArtisan,
        changefreq: "daily",
        priority: 1,
    };

    /* ----- Membres ----- */
    const { data: membresData } = await axios.get(
        `${apiBaseUrl}/auth/membres_lome_auth`
    );

    const mostRecentMembre = membresData
        .map((mbr) => mbr.updatedAt)
        .sort((date1, date2) => (date1 < date2 ? 1 : -1))[0];

    const membresPage = {
        url: `/membres`,
        links: [{ lang: "fr", url: `/membres` }],
        lastmod: mostRecentMembre,
        changefreq: "monthly",
        priority: 0.6,
    };

    return [
        homePage,
        actualitesPage,
        ...actualitesByIdPages,
        artisansPage,
        ...artisansByIdPages,
        ...realisationsByIdPages,
        membresPage,
    ];
};
