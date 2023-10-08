import Head from "next/head";

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
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
