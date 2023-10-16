import useEntriesStore from "@/store/entries";
import AppHeader from "../app-header/app-header";
import AppFooter from "../app-footer/app-footer";
import AppStatistics from "../app-statistics/app-statistics";
import AppSidePanel from "../app-side-panel/app-side-panel";
import AppInitializingScreen from "../app-initializing-screen/app-initializing-screen";

const AppLayout = ({ children }) => {

    const {
        projectEntries,
        articleEntries,
        testimonialEntries
    } = useEntriesStore();

    return (
        <>
            <div className="app-view">
                <AppHeader />
                <main className="app-main">{children}</main>
                <AppStatistics />
                <AppFooter />
            </div>

            <AppSidePanel />

            {(projectEntries && articleEntries && testimonialEntries)
                ? null
                : <AppInitializingScreen hasLogo={true} hasIndicator={true} hasSkeleton={true} />
            }
        </>
    );
};

export default AppLayout;
