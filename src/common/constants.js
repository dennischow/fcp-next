export const AWAY_PAGE_TITLE = "Come Back";
export const BRAND_NAME = process.env.NEXT_PUBLIC_DEFAULT_BRAND_NAME;
export const AUTHOR = process.env.NEXT_PUBLIC_DEFAULT_AUTHOR;
export const VIDEO_IDS = [
    "9XBIcYE1T98",
    "Z5NoQg8LdDk",
    "zSmvW2sZ3ZU",
    "YUTK6AcjHQQ",
    "BaOScwq_lZs",
    "om-OQ2VaN-w",
    "ByucbuSe958",
    "tQ0yjYUFKAE",
    "I7R-PSvvziU",
    "zqOWV_pq9Zs",
    "WZf9IkF7YHg",
    "z5rRZdiu1UE",
    "eVTXPUF4Oz4",
    "JTMVOzPPtiw",
    "2cXDgFwE13g",
];

export const SOCIAL_URL = {
    linkedIn: process.env.NEXT_PUBLIC_DEFAULT_SOCIAL_URL_LINKEDIN,
    github: process.env.NEXT_PUBLIC_DEFAULT_SOCIAL_URL_GITHUB,
};

export const ENDPOINT = {
    projects: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_WORKS,
    articles: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_ARTICLES,
    testimonials: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_TESTIMONIALS,
    contact: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_CONTACT,
};

export const ROUTES = {
    home: {
        title: "Home",
        name: "Home",
        path: "/",
    },
    about: {
        title: "About",
        name: "About",
        path: "/about",
    },
    projectsOverview: {
        title: "Project Overview",
        name: "Projects",
        path: "/projects/overview",
    },
    projectsDetails: {
        title: "Project Details",
        name: "Project Details",
        path: "/projects/details",
    },
    articlesOverview: {
        title: "Article Overview",
        name: "Articles",
        path: "/articles/overview",
    },
    articlesDetails: {
        title: "Article Details",
        name: "Articles",
        path: "/articles/details",
    },
    notFound: {
        title: "404 Page Not Found",
        name: "Not Found",
        path: "/page-not-found",
    },
};
