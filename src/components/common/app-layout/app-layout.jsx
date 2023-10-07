import Head from "next/head";

import AppHeader from "../app-header/app-header";
import AppFooter from "../app-footer/app-footer";
import AppStatistics from "../app-statistics/app-statistics";

const AppLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Next App</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
        </>
    );
};

export default AppLayout;
