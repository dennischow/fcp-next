/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    basePath: "",
    sassOptions: {
        includePaths: [path.join(__dirname, "assets/styles")],
        // prependData: `@import "./src/assets/styles/index.scss";`,
    },
    trailingSlash: true,
};

module.exports = nextConfig;
