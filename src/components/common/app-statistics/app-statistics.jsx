import useEntriesStore from "@/store/entries";

const AppStatistics = () => {
    const { projectEntries, articleEntries, testimonialEntries } = useEntriesStore();

    return (
        <div className="app-statistics">
            <div className="app-statistics__container">
                <div className="app-statistics__col">
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">{projectEntries?.length}</span>
                            <span className="app-statistics__text">project uploaded</span>
                        </p>
                    </div>
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">{articleEntries?.length}</span>
                            <span className="app-statistics__text">articles shared</span>
                        </p>
                    </div>
                    <div className="app-statistics__box">
                        <p className="app-statistics__content">
                            <span className="app-statistics__num">{testimonialEntries?.length}</span>
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
