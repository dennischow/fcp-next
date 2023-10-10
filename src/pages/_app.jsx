import { useEffect } from "react";

import "./../assets/styles/index.scss";

import api from "@/services/api";
import useEntriesStore from "@/store/entries";

export default function App({ Component, pageProps }) {
    const {
        projectEntries,
        setProjectEntries,
        articleEntries,
        setArticleEntries,
        testimonialEntries,
        setTestimonialEntries,
    } = useEntriesStore();

    const fetchData = async () => {
        if (projectEntries && articleEntries && testimonialEntries) return;

        try {
            const [projects, articles, testimonials] = await Promise.all([
                api.get.projects(),
                api.get.articles(),
                api.get.testimonials(),
            ]);

            setProjectEntries(projects.data);
            setArticleEntries(articles.data);
            setTestimonialEntries(testimonials.data);

            console.log("Data fetched!!!");
            console.log("projectEntries:", projects.data);
            console.log("articleEntries:", articles.data);
            console.log("testimonialEntries:", testimonials.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <Component {...pageProps} />;
}
