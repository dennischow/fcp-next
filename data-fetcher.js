const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { exit } = require("process");
const dotenv = require("dotenv");

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

// exit();

const apiData = [
    {
        endpoint: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_TESTIMONIALS,
        filename: "testimonials.json", // Specify a custom filename for this API
    },
    {
        endpoint: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_ARTICLES,
        filename: "articles.json", // Specify a custom filename for this API
    },
    {
        endpoint: process.env.NEXT_PUBLIC_DEFAULT_ENDPOINT_WORKS,
        filename: "projects.json", // Specify a custom filename for this API
    },
    // Add more API endpoints and custom filenames as needed
];

const dataFolderPath = "./src/data";

const fetchingOptions = {
    onDownloadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log(`Download Progress: ${progress}%`);
    },
};

async function fetchAndGenerateJSON() {
    try {
        await fs.remove(dataFolderPath);
        console.log("Data folder removed successfully.");

        // Create a directory to store JSON files if it doesn't exist
        await fs.ensureDir(dataFolderPath);

        // Fetch data from each API endpoint and use the specified filename
        for (const { endpoint, filename } of apiData) {
            const response = await axios.get(endpoint, fetchingOptions);
            const data = response.data;

            // Generate the complete path for the JSON file
            const filePath = path.join(dataFolderPath, filename);

            // Write the API response data to the specified JSON file
            await fs.writeJson(filePath, data, { spaces: 2 });
            console.log(`Data fetched from ${endpoint} and saved as ${filePath}`);
        }

        console.log("All data fetched and JSON files generated successfully.");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchAndGenerateJSON();
