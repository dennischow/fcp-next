const AppStatistics = () => {
    const staticData = {
        allProjectsJson: [],
        allArticlesJson: [],
        allTestimonialsJson: [],
    };

    const { allProjectsJson, allArticlesJson, allTestimonialsJson } = staticData;
    const projectsCount = allProjectsJson.length;
    const articlesCount = allArticlesJson.length;
    const testimonialsCount = allTestimonialsJson.length;

    return (
        <div className="app-statistics">
            <div className="app-statistics__container">
                <div className="app-statistics__col">
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">{projectsCount}</span>
                            <span className="app-statistics__text">project uploaded</span>
                        </p>
                    </div>
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">{articlesCount}</span>
                            <span className="app-statistics__text">articles shared</span>
                        </p>
                    </div>
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">{testimonialsCount}</span>
                            <span className="app-statistics__text">testimonials received</span>
                        </p>
                    </div>
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">Infinite</span>
                            <span className="app-statistics__text">passion</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppStatistics;
