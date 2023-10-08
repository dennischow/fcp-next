/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight, FaCode, FaPaintBrush, FaMusic } from "react-icons/fa";

import * as CONSTANTS from "../common/constants";
import * as UTILS from "../common/utils";
import api from "@/services/api";
import AppLayout from "@/components/common/app-layout/app-layout";
import AppFeatureBanner from "@/components/common/app-feature-banner/app-feature-banner";
import YoutubePlayer from "@/components/shared/youtube-player/youtube-player";
import TestimonialWidget from "@/components/shared/testimonial-widget/testimonial-widget";
import heroBackgroundImg from "../assets/images/home/polygon-colored-crossed-dark-extend-bg.jpg";

export default function PageHome({ projectEntries, articleEntries, testimonialEntries }) {

    const [isYoutubePlayerOn, setIsYoutubePlayerOn] = useState(false);

    const openYoutubePlayer = () => setIsYoutubePlayerOn(true);
    const closeYoutubePlayer = () => setIsYoutubePlayerOn(false);

    return (
        <>
            <Head>
                <title>Homepage</title>
                <meta name="description" content="Homepage" />
            </Head>
            <AppLayout>
                <div className="page-home">
                    <AppFeatureBanner
                        type="hero"
                        heroBackgroundUrl={heroBackgroundImg.src}
                        heading="<span>Just a</span> <span>Front-End</span> <span>Web Developer</span>"
                        subHeading="Who cares about things that users see and interact with"
                    />

                    <section className="section projects-highlight">
                        <div className="projects-highlight__container">
                            <div className="projects-highlight__teaser">
                                <div className="projects-highlight-teaser-box">
                                    <h2 className="projects-highlight__teaser-title">Creativity</h2>
                                    <p className="projects-highlight__teaser-des">
                                        There are different ways to be creative. Find out what mine are.
                                    </p>
                                    <Link className="projects-highlight__teaser-link app-cta app-cta--white" href={CONSTANTS.ROUTES.projectsOverview.path}>
                                        Check it out <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                            <div className="projects-highlight__entries">
                                {projectEntries.length > 0 && projectEntries.slice(0, 4).map((item, index) => (
                                    <Link className="projects-highlight__entry" key={item.entry_id} href={`${CONSTANTS.ROUTES.projectsDetails.path}/${item.url_title}`}>
                                        <div className="projects-highlight__entry-visual"
                                            role="img"
                                            style={{backgroundImage: `url(${item.thumbnail})`}}>
                                        </div>
                                        <p className="projects-highlight__entry-cat">{UTILS.convertProjectCatIdToName(item.channel_id)}</p>
                                        <div className="projects-highlight__entry-title">
                                            {item.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="section recent-articles">
                        <div className="recent-articles__container">
                            <div className="recent-articles__header">
                                <h2 className="recent-articles__header-title">Recent article posts</h2>
                                <p className="recent-articles__header-des">
                                    A casual corner to share what's on my mind. Come hang!
                                </p>
                            </div>
                            <div className="recent-articles__entries">
                                {articleEntries.length > 0 && articleEntries.slice(0, 8).map((item, index) => (
                                    <Link className="recent-articles__entry" key={item.entry_id} href={`${CONSTANTS.ROUTES.articlesDetails.path}/${item.url_title}`}>
                                        <div className="recent-articles__entry-visual"
                                            role="img"
                                            style={{backgroundImage: `url(${item.thumb_image ? item.thumb_image : item.thumb_image_hotlink})`}}>
                                        </div>
                                        <div className="recent-articles__entry-title">
                                            {item.title}
                                        </div>
                                        <small className="recent-articles__entry-info">
                                            <time className="recent-articles__entry-date">{UTILS.convertToRelativeDate(item.entry_date)}</time>
                                            {/* {" "}|{" "}
                                            <span className="recent-articles__entry-views">[Views]</span> */}
                                        </small>
                                    </Link>
                                ))}
                            </div>
                            <Link className="recent-articles__view-all-link" href={CONSTANTS.ROUTES.articlesOverview.path}>
                                View all post <FaArrowRight />
                            </Link>
                        </div>
                    </section>

                    <section className="section passionate-highlight">
                        <div className="passionate-highlight__container">
                            <div className="passionate-highlight__teaser">
                                <div className="passionate-highlight-teaser-box">
                                    <h2 className="passionate-highlight__teaser-title">Passionate</h2>
                                    <p className="passionate-highlight__teaser-des">
                                        I have a passion. Want to know what it is? Come check it out.
                                    </p>
                                    <Link className="passionate-highlight__teaser-link app-cta app-cta--white" href={CONSTANTS.ROUTES.about.path}>
                                        Learn more <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                            <div className="passionate-highlight__interests">
                                <div className="passionate-highlight__interest">
                                    <p className="passionate-highlight__interest-icon">
                                        <FaCode />
                                    </p>
                                    <p className="passionate-highlight__interest-text">Code</p>
                                </div>
                                <div className="passionate-highlight__interest">
                                    <p className="passionate-highlight__interest-icon">
                                        <FaPaintBrush />
                                    </p>
                                    <p className="passionate-highlight__interest-text">Design</p>
                                </div>
                                <button className="passionate-highlight__interest" onClick={openYoutubePlayer}>
                                    <p className="passionate-highlight__interest-icon">
                                        <FaMusic />
                                    </p>
                                    <p className="passionate-highlight__interest-text">Music</p>
                                </button>
                            </div>
                        </div>
                    </section>

                    {isYoutubePlayerOn && <YoutubePlayer closeYoutubePlayer={closeYoutubePlayer} />}

                    <TestimonialWidget isContentExpandedByDefault={false} entriesLimitByDefault={5} testimonialEntries={testimonialEntries} />
                </div>
            </AppLayout>
        </>
    );
}


export async function getStaticProps() {
    //Make API call here
    // const response = await api.get.projects();
    // const projectEntries = response.data;
    // return {
    //     props: { projectEntries }, // will be passed to the page component as props
    // };

    const [projects, articles, testimonials] = await Promise.all([
        api.get.projects(),
        api.get.articles(),
        api.get.testimonials(),
    ]);

    return {
        props: {
            projectEntries: projects.data,
            articleEntries: articles.data,
            testimonialEntries: testimonials.data,
        }, // will be passed to the page component as props
    };

}