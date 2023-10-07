export const disableProductionLogging = () => {
    if (process.env.NODE_ENV !== "development") {
        console.log = () => {};
        console.debug = () => {};
        console.info = () => {};
        console.warn = () => {};
        console.table = () => {};
    }
};
