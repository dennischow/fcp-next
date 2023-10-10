import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs-extra";
import path from "path";
import { FaArrowLeft } from "react-icons/fa";

import * as CONSTANTS from "../../../common/constants";
import * as UTILS from "../../../common/utils";
import api from "../../../services/api";
import AppLayout from "../../../components/common/app-layout/app-layout";
import AppFeatureBanner from "../../../components/common/app-feature-banner/app-feature-banner";

const PageArticlesDetails = ({ currentPost, relatedPosts }) => {
    const postContentRef = useRef(null);

    const postContentManipulation = () => {
        const iframeElements = postContentRef?.current?.querySelectorAll("iframe") || [];
        if (iframeElements.length) {
            iframeElements.forEach((iframeElement) => {
                const mediaEmbedWrapper = document.createElement("div");
                mediaEmbedWrapper.classList.add("media-embed", "media-embed--aspect-16by9");
                iframeElement.classList.add("media-embed__media-item");
                iframeElement?.parentNode?.insertBefore(mediaEmbedWrapper, iframeElement);
                mediaEmbedWrapper.appendChild(iframeElement);
            });
        }
        console.log("postContentManipulation ran");
    };

    useEffect(() => {
        postContentManipulation();
    }, []);

    return (
        <>
            <Head>
                <title>{`${currentPost?.title} | Articles Details | ${CONSTANTS.BRAND_NAME}`}</title>
            </Head>
            <AppLayout>
                <div className="page-articles-details">
                    <AppFeatureBanner
                        type="info"
                        heroBackgroundUrl={currentPost?.thumb_image ? currentPost?.thumb_image : currentPost?.thumb_image_hotlink}
                        heading={currentPost?.title}
                        subHeading={UTILS.convertToFormatDate(currentPost?.entry_date)}
                    />

                    <div className="article-details">
                        <div className="article-details__container app-container">

                            <div className="article-details__wrapper">
                                <div className="article-details__post">
                                    <div className="article-details__post-content"
                                        ref={postContentRef}
                                        dangerouslySetInnerHTML={{__html: currentPost?.blog_body}}>
                                    </div>
                                </div>
                                <div className="article-details__sidebar">
                                    <div className="article-details__sidebar-content">
                                        <h3 className="article-details__sidebar-header">You may also be interested in:</h3>
                                        <ul className="article-details__related-list">
                                            {relatedPosts && relatedPosts.map((item, index) => (
                                                <li className="article-details__related-item" key={`related-post-${item?.entry_id}`}>
                                                    <div className="article-details__related-visual"
                                                        role="img"
                                                        style={{backgroundImage: `url(${item?.thumb_image ? item?.thumb_image : item?.thumb_image_hotlink})`}}>
                                                    </div>
                                                    <p className="article-details__related-title">
                                                        <Link className="article-details__related-title-link" href={`${CONSTANTS.ROUTES.articlesDetails.path}/${item?.url_title}`}>
                                                            {item?.title}
                                                        </Link>
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="article-details__sidebar-overview-link">
                                            <Link href={CONSTANTS.ROUTES.articlesOverview.path}>
                                                <FaArrowLeft /> Back to articles overview
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default PageArticlesDetails;

export async function getStaticPaths() {
    const dataFolderPath = path.join(process.cwd(), "src/data");

    try {
        const [articles] = await Promise.all([
            fs.readJson(path.join(dataFolderPath, "articles.json")),
        ]);

        const paths = articles.map((article) => ({
            params: {
                entryId: article.url_title,
            },
        }));

        return {
            paths,
            fallback: false,
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            paths: [],
            fallback: false,
        };
    }
}

export async function getStaticProps({ params }) {
    const dataFolderPath = path.join(process.cwd(), "src/data");

    try {
        const [articles] = await Promise.all([
            fs.readJson(path.join(dataFolderPath, "articles.json")),
        ]);

        const currentPost = articles.find((article) => {
            return article.url_title === params.entryId;
        });

        const relatedPosts = currentPost?.related_post?.map((id) => articles.find((article) => article.entry_id === id)).filter((post) => post !== undefined);

        return {
            props: {
                currentPost,
                relatedPosts,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                currentPost: null,
                relatedPosts: [],
            },
        };
    }
}
