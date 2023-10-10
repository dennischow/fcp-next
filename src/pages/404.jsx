/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Head from "next/head";

import * as CONSTANTS from "../common/constants";
import AppLayout from "@/components/common/app-layout/app-layout";

const PageNotFound = () => {
    return (
        <>
            <Head>
                <title>{`Page not found | ${CONSTANTS.BRAND_NAME}`}</title>
            </Head>
            <AppLayout>
                <div className="page-not-found">
                    <div className="not-found">
                        <div className="not-found__container app-container">
                            <div className="not-found__content">
                                <p className="not-found__status">Don't drink and drive, and you'll stay alive</p>
                                <h1 className="not-found__message">404 page not found</h1>
                                <h2 className="not-found__choice">
                                    You gotta go{" "}
                                    <Link className="not-found__link" href={CONSTANTS.ROUTES.home.path}>
                                        home
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default PageNotFound;
