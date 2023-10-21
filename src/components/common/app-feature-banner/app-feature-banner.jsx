// import DOMPurify from "dompurify";

const AppFeatureBanner = ({ type, heroBackgroundUrl, heading, subHeading, ...otherProps }) => {
    // type: default, hero, info

    const getBannerClass = (bannerType) => {
        const classNames = ["app-feature-banner"];
        switch (bannerType) {
            case "hero":
                classNames.push("app-feature-banner--hero");
                break;
            case "info":
                classNames.push("app-feature-banner--info");
                break;
            default:
                classNames.push("app-feature-banner--default");
        }
        return classNames.join(" ");
    };


    return (
        <section className={getBannerClass(type)}>
            <div className="app-feature-banner__container">
                <div className="app-feature-banner__box">
                    {type === "hero" || type === "info" ? (
                        <div className="app-feature-banner__visual" style={{ backgroundImage: `url(${heroBackgroundUrl})` }}></div>
                    ) : null}
                    <div className="app-feature-banner__content">
                        <div className="app-feature-banner__tagline">
                            {/* <h2 className="app-feature-banner__heading" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(heading) }}></h2> */}
                            <h1 className="app-feature-banner__heading" dangerouslySetInnerHTML={{ __html: heading }}></h1>
                            <h2 className="app-feature-banner__sub-heading">{subHeading}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppFeatureBanner;
