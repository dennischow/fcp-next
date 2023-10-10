import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import fs from "fs-extra";
import path from "path";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import * as CONSTANTS from "../../../common/constants";
import * as UTILS from "../../../common/utils";
import api from "../../../services/api";
import AppLayout from "../../../components/common/app-layout/app-layout";
import AppFeatureBanner from "../../../components/common/app-feature-banner/app-feature-banner";

const ArticlesOverview = ({ articleEntries }) => {
    const [articlesFilteredByPerPortion, setArticlesFilteredByPerPage] = useState(articleEntries);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(null);
    const [isPrevEnabled, setIsPrevEnabled] = useState(false);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    const entriesPerPage = 12;

    useEffect(() => {
        setTotalPageNumber(Math.ceil(articleEntries.length / entriesPerPage));
    }, [articleEntries]);

    useEffect(() => {
        updateArticlesRange();
        paginationTracking();
    }, [currentPageNumber, totalPageNumber]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [articlesFilteredByPerPortion]);

    const paginationTracking = () => {
        setIsPrevEnabled(currentPageNumber > 1);
        setIsNextEnabled(currentPageNumber < totalPageNumber);
    };

    const updateArticlesRange = () => {
        const startIndex = (currentPageNumber - 1) * entriesPerPage;
        const endIndex = currentPageNumber * entriesPerPage;
        const result = articleEntries.slice(startIndex, endIndex);
        setArticlesFilteredByPerPage(result);
    };

    const pageSwitchHandler = (event, action) => {
        event.preventDefault();
        switch (action) {
            case "previous":
                setCurrentPageNumber((preValue) => Math.max(preValue - 1, 1));
                console.log(`pageSwitchHandler triggered by ${action}`);
                break;
            case "next":
                setCurrentPageNumber((preValue) => preValue + 1);
                console.log(`pageSwitchHandler triggered by ${action}`);
                break;
            default:
                console.log(`pageSwitchHandler triggered with unknown action: ${action}`);
                break;
        }
    };

    return (
        <>
            <Head>
                <title>{`Articles Overview | ${CONSTANTS.BRAND_NAME}`}</title>
            </Head>
            <AppLayout>
                <div className="page-articles-overview">
                    <AppFeatureBanner
                        type="default"
                        heroBackgroundUrl={""}
                        heading="A casual corner to share what's on my mind"
                        subHeading="So random uh? It's my style"
                    />

                    <section className="articles-block">
                        <div className="articles-block__container">

                            {articlesFilteredByPerPortion.length > 0 && (
                                <p className="articles-block__pagination">
                                    <span className="articles-block__pagination-display">
                                        {`page ${currentPageNumber} of ${totalPageNumber}`}
                                    </span>
                                    <button className="articles-block__pagination-button articles-block__pagination-button--previous"
                                        disabled={!isPrevEnabled}
                                        onClick={(event) => pageSwitchHandler(event, "previous")}>
                                        <FaAngleLeft />
                                    </button>
                                    <button className="articles-block__pagination-button articles-block__pagination-button--next"
                                        disabled={!isNextEnabled}
                                        onClick={(event) => pageSwitchHandler(event, "next")}>
                                        <FaAngleRight />
                                    </button>
                                </p>
                            )}

                            <div className="articles-block__entries">
                                {articlesFilteredByPerPortion.length > 0 && articlesFilteredByPerPortion.map((item, index) => (
                                    <Link className="articles-block__entry" key={item.entry_id} href={`${CONSTANTS.ROUTES.articlesDetails.path}/${item.url_title}`}>
                                        <div
                                            className="articles-block__entry-visual"
                                            role="img"
                                            style={{backgroundImage: `url(${item.thumb_image ? item.thumb_image : item.thumb_image_hotlink})`}}></div>
                                        <div className="articles-block__entry-title">
                                            {item.title}
                                        </div>
                                        <small className="articles-block__entry-info">
                                            <time className="articles-block__entry-date">
                                                {UTILS.convertToRelativeDate(item.entry_date)}
                                            </time>
                                            {/* {" "} | {" "}
                                            <span className="articles-block__entry-views">[Views]</span> */}
                                        </small>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {articlesFilteredByPerPortion.length > 0 && (
                            <div className="articles-block__buttons-container">
                                <button
                                    className="app-cta app-cta--gray"
                                    disabled={!isPrevEnabled}
                                    onClick={(event) => pageSwitchHandler(event, "previous")}>
                                    Previous
                                </button>
                                <button
                                    className="app-cta app-cta--gray"
                                    disabled={!isNextEnabled}
                                    onClick={(event) => pageSwitchHandler(event, "next")}>
                                    Next
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </AppLayout>
        </>
    );
};

export default ArticlesOverview;

export async function getStaticProps() {
    const dataFolderPath = path.join(process.cwd(), "src/data");

    try {
        const [articles] = await Promise.all([
            fs.readJson(path.join(dataFolderPath, "articles.json")),
        ]);

        return {
            props: {
                articleEntries: articles,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                articleEntries: [],
            },
        };
    }
}
