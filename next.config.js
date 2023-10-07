/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        // prependData: `@import "./src/assets/styles/index.scss";`,
    },
};

module.exports = nextConfig;
