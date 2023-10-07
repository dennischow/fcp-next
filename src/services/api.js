import axios from "axios";

import * as CONSTANTS from "../common/constants";

const api = {
    get: {
        projects: () => axios.get(CONSTANTS.ENDPOINT.projects),
        articles: () => axios.get(CONSTANTS.ENDPOINT.articles),
        testimonials: () => axios.get(CONSTANTS.ENDPOINT.testimonials),
    },
    post: {
        contact: async (data) => axios.post(CONSTANTS.ENDPOINT.contact, data),
    },
};

export default api;
