const FtpDeploy = require("ftp-deploy");
const base64 = require("base-64");
const dotenv = require("dotenv");
const yargs = require("yargs");

const argv = yargs.option("NODE_ENV", {
    describe: "Directory to deploy to",
    type: "string",
    demandOption: true, // make NODE_ENV required
    choices: ["development", "production"], // ensure it's either dev or prod
    coerce: (arg) => arg.trim(), // trim and lowercase the value
}).argv;

// Load environment variables based on current environment
dotenv.config({ path: `.env.${argv.NODE_ENV}` });

const FTP_USER = base64.decode(process.env.DEPLOYMENT_FTP_USER);
const FTP_PASSWORD = base64.decode(process.env.DEPLOYMENT_FTP_PASSWORD);
const FTP_HOST = process.env.DEPLOYMENT_FTP_HOST;
const LOCAL_ROOT_DIR = process.env.DEPLOYMENT_LOCAL_ROOT_DIR;
const REMOTE_ROOT_DIR = process.env.DEPLOYMENT_REMOTE_ROOT_DIR;

const config = {
    user: FTP_USER,
    // Password optional, prompted if none given
    password: FTP_PASSWORD,
    host: FTP_HOST,
    port: 21,
    localRoot: __dirname + LOCAL_ROOT_DIR,
    remoteRoot: "/public_html" + REMOTE_ROOT_DIR,
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ["*", "**/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**", ".DS_Store"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
    timeout: 600000,
};

const retryOption = {
    maxLimit: 3,
    currentCount: 0,
    delayTimeout: 5000, // Retry after 5 seconds
};

function deployWithRetry() {
    const ftpDeploy = new FtpDeploy(); // ftpDeploy instance

    const countDownToDeploy = () => {
        let countdownSeconds = retryOption.delayTimeout / 1000; // Countdown duration in seconds

        const countdownInterval = setInterval(() => {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`Retrying connection in ${countdownSeconds} seconds...`);
            countdownSeconds--;

            if (countdownSeconds < 0) {
                clearInterval(countdownInterval);
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                return;
            }
        }, 1000);
    };

    ftpDeploy
        .deploy(config)
        .then((res) => {
            console.log("finished:", res);
            console.log(`
            ==========================================
            :::::::::: DONE ::::::::::
            Environment: ${argv.NODE_ENV}
            Successfully deployed to ${config.remoteRoot}
            ==========================================`);
        })
        .catch((err) => {
            console.log(`ftpDeploy catch err`, err);

            if (retryOption.currentCount < retryOption.maxLimit) {
                retryOption.currentCount++;
                console.log(`Retrying connection (attempt ${retryOption.currentCount})...`);
                setTimeout(deployWithRetry, retryOption.delayTimeout);
                countDownToDeploy();
            } else {
                console.log(`Max retries reached. Deployment failed.`);
                console.log(`
                ==========================================
                :::::::::: FAILED ::::::::::
                Environment: ${argv.NODE_ENV}
                Unsuccessfully deployed to ${config.remoteRoot}
                ==========================================`);
            }
        });

    ftpDeploy.on("uploading", function (data) {
        // console.log(data.totalFilesCount); // total file count being transferred
        // console.log(data.transferredFileCount); // number of files transferred
        console.log(`filename: ${data.filename}`); // partial path with filename being uploaded
        console.log(`Uploading to ${config.remoteRoot}`);
    });

    ftpDeploy.on("uploaded", function (data) {
        const { error, ...uploadedData } = data;
        console.log("uploaded", data); // same data as uploading event
    });

    ftpDeploy.on("log", function (data) {
        const { error, ...logData } = data;
        console.log("log", data); // same data as uploading event
    });

    ftpDeploy.on("upload-error", function (data) {
        console.log("upload-error", data.err); // data will also include filename, relativePath, and other goodies
    });
}

deployWithRetry();
