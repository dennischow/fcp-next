/* eslint-disable @next/next/no-img-element */
import * as UTILS from "../../../common/utils";
import api from "@/services/api";
import AppLayout from "@/components/common/app-layout/app-layout";
import AppFeatureBanner from "@/components/common/app-feature-banner/app-feature-banner";

const PageProjectsDetails = ({ currentPost }) => {
    return (
        <>
            <Head>
                <title>{`${currentPost?.title} | Project Details | ${CONSTANTS.BRAND_NAME}`}</title>
            </Head>
            <AppLayout>
                <div className="page-projects-details">
                    <AppFeatureBanner
                        type="info"
                        heroBackgroundUrl={currentPost?.thumbnail}
                        heading={currentPost?.title}
                        subHeading={UTILS.convertProjectCatIdToName(currentPost?.channel_id)}
                    />
                    <div className="project-details">
                        <div className="project-details__container app-container">

                            <div className="project-details__wrapper">
                                <div className="project-details__visual">
                                    <figure className="project-details__visual-figure">
                                        {currentPost?.full_image?.map((item, index) => (
                                            <img className="project-details__visual-image"
                                                key={index}
                                                src={item.image}
                                                alt={`${currentPost?.title} screenshot ${index + 1} of ${currentPost?.full_image.length}`} />
                                        ))}
                                    </figure>
                                </div>

                                <div className="project-details__info">
                                    <div className="project-details__info-content">
                                        <p className="project-details__info-subject">Description:</p>
                                        <div className="project-details__info-description"
                                            dangerouslySetInnerHTML={{__html: currentPost?.description}}>
                                        </div>
                                        <p className="project-details__info-subject">Year:</p>
                                        <p className="project-details__info-description">{currentPost?.project_date}</p>
                                        <p className="project-details__info-subject">Produced with:</p>
                                        <p className="project-details__info-description">{currentPost?.language_software}</p>
                                        {currentPost?.visit_url && (
                                            <>
                                                <p className="project-details__info-subject">Demo :</p>
                                                <p className="project-details__info-description">
                                                    <a className="project-details__info-live-demo-link"
                                                        href={currentPost?.visit_url}
                                                        target="_blank"
                                                        title="Open in new window"
                                                        rel="noopener noreferrer">
                                                            {currentPost?.visit_url}
                                                    </a>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

export default PageProjectsDetails;

export async function getStaticPaths() {
    const dataFolderPath = path.join(process.cwd(), "src/data");

    try {
        const [projects] = await Promise.all([
            fs.readJson(path.join(dataFolderPath, "projects.json")),
        ]);

        const paths = projects.map((project) => ({
            params: {
                entryId: project.url_title,
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
        const [projects] = await Promise.all([
            fs.readJson(path.join(dataFolderPath, "projects.json")),
        ]);

        const currentPost = projects.find((project) => {
            return project.url_title === params.entryId;
        });

        return {
            props: {
                currentPost,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                currentPost: null,
            },
        };
    }
}
