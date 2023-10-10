/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import fs from "fs-extra";
import path from "path";
import { FaArrowRight } from "react-icons/fa";

import * as CONSTANTS from "../../../common/constants";
import * as UTILS from "../../../common/utils";
import api from "@/services/api";
import AppLayout from "../../../components/common/app-layout/app-layout";
import AppFeatureBanner from "../../../components/common/app-feature-banner/app-feature-banner";

const ProjectsOverview = ({ projectEntries }) => {
    const [projectsFilteredByCategory, setProjectsFilteredByCategory] = useState(projectEntries);
    const [activeCategoryId, setActiveCategoryId] = useState(4);
    const categoryTabsList = [
        {
            id: 4,
            text: "Web Projects",
            definition: "thinking + coding",
        },
        {
            id: 5,
            text: "Print Projects",
            definition: "layout + cmyk",
        },
        {
            id: 6,
            text: "Tee Projects",
            definition: "creativity + production",
        },
    ];

    const getCategoryListElementClassName = (isActive) => {
        const classNames = ["projects-category__list-item"];
        if (isActive) {
            classNames.push("projects-category__list-item--active");
        }
        return classNames.join(" ");
    };

    const categoryToShow = (catId) => {
        const result = projectEntries.filter((item) => {
            return item.channel_id === catId;
        });
        setProjectsFilteredByCategory(result);
    };

    const categorySelectHandler = (event, catId) => {
        setActiveCategoryId(catId);
        categoryToShow(catId);
        console.log(event.target, catId);
    };

    useEffect(() => {
        categoryToShow(activeCategoryId);
    }, []);

    return (
        <>
            <Head>
                <title>{`Projects Overview | ${CONSTANTS.BRAND_NAME}`}</title>
                <meta name="description" content="Design + Coding is about solving problems. Let my work samples speak on my behalf." />
            </Head>
            <AppLayout>
                <div className="app-page page-projects-overview">
                    <AppFeatureBanner
                        type="default"
                        heroBackgroundUrl={""}
                        heading="Nowadays I focus on front-end web development"
                        subHeading="Let my work samples speak on my behalf"
                    />

                    <div className="projects-category">
                        <div className="projects-category__container">
                            <ul className="projects-category__list" role="tablist">
                                {categoryTabsList.map((item, index) => (
                                    <li className={getCategoryListElementClassName(activeCategoryId === item.id)} key={item.id} role="tab">
                                        <button
                                            className="projects-category__btn"
                                            onClick={(event) => categorySelectHandler(event, item.id)}>
                                            {item.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="projects-intro">
                        <div className="projects-intro__container">
                            {projectsFilteredByCategory.length > 0 && projectsFilteredByCategory.slice(0, 1).map((item, index) => {
                                const id = item.channel_id;
                                const catObj = categoryTabsList.find((item, index) => item.id === id);
                                return (
                                    <p className="projects-intro__content" key={item.entry_id}>
                                        <span className="projects-intro__category-name">{UTILS.convertProjectCatIdToName(catObj.id)}</span>
                                        <span className="projects-intro__definition">{catObj.definition}</span>
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    <div className="projects-block">
                        <div className="projects-block__container">
                            <ul className="projects-block__list">
                                {projectsFilteredByCategory.length > 0 && projectsFilteredByCategory.map((item, index) => (
                                    <li className="projects-block__list-item" key={index}>
                                        <Link className="projects-block__content" href={`${CONSTANTS.ROUTES.projectsDetails.path}/${item.url_title}`}>
                                            <p className="projects-block__title">
                                                <span className="projects-block__title-text">
                                                    {item.title}
                                                </span>
                                            </p>
                                            <div
                                                className="projects-block__visual"
                                                role="img"
                                                aria-label={item.title}
                                                style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                                <img
                                                    className="projects-block__img"
                                                    src={item.thumbnail}
                                                    height="300"
                                                    width="300"
                                                    alt={`Thumbnail of ${item.title}`}
                                                />
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="projects-block__buttons-container">
                                <Link className="app-cta app-cta--orange" href={CONSTANTS.ROUTES.about.path}>
                                    Learn more about me <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );

};

export default ProjectsOverview;

export async function getStaticProps() {
    const dataFolderPath = path.join(process.cwd(), "src/data");

    try {
        const [projects] = await Promise.all([
            fs.readJson(path.join(dataFolderPath, "projects.json")),
        ]);

        return {
            props: {
                projectEntries: projects,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                projectEntries: [],
            },
        };
    }
}
