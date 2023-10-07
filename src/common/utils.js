import moment from "moment";

export const convertToRelativeDate = (date) => moment(date).fromNow();

export const convertToFormatDate = (date) => moment(date).format("MMMM Do, YYYY");

export const getEstimatedReadingTime = (content) => {
    const wordsPerMinute = 200; // average reading speed of an adult
    const wordCount = content.split(" ").length;
    const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);
    return moment.duration(readingTimeInMinutes, "minutes");
}

export const convertProjectCatIdToName = (id) => {
    let result = null;
    switch (id) {
        case 4:
            result = "Web Development / Design";
            break;
        case 5:
            result = "Print Design / Production";
            break;
        case 6:
            result = "Tee Design";
            break;
        default:
            result = id;
    }
    return result;
};
