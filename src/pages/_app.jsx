import { useEffect } from "react";
import Head from "next/head";

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

    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/logo512.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
