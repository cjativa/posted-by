const SEARCH_TERM = '/status/';

const getTweetId = (text: string): string | null => {
    let tweetId = null;

    // Get the location of the tweet id relative to the status parameter
    const termIndex = text.indexOf(SEARCH_TERM);

    // This means "/status/" was found in the text
    // so we can attempt to extract the id
    if (termIndex > -1) {
        const idStart = termIndex + SEARCH_TERM.length;
        const idString = text.substring(idStart);

        // Find the end of the id 
        const backSlashIndex = idString.indexOf('/');
        const idEnd = (backSlashIndex > -1)
            ? backSlashIndex // An ending "/" marks the end of the id
            : idString.length; // Otherwise, use the last char

        tweetId = idString.substring(0, idEnd);
    }

    // Otherwise, we may have been provided the tweet id by itself
    // We'll check here for the scenario of "/123456789/"
    else if (text[0] === '/' && text[text.length - 1] === '/') {
        tweetId = text.substring(1, text.length - 1);
    }

    // Last ditch effort, the passed in text
    // is the tweet id itself
    else if (parseInt(text) > 0) {
        tweetId = text;
    }

    return tweetId;
};

const getFirstLine = (text: string): string => {

    const firstPeriodIndex = text.indexOf('.');
    const firstNewlineIndex = text.indexOf('\n');
    const firstCommaIndex = text.indexOf(',');

    // Get the earliest position out of our desired characters
    const foundIndexes = [
        firstPeriodIndex,
        firstNewlineIndex,
        firstCommaIndex,
    ].filter((num) => num > -1);
    const lowestIndex = Math.min(...foundIndexes);

    // Use the earliest position
    let lineEnd = (!isNaN(lowestIndex))
        ? lowestIndex
        : text.length;

    // If the line end is more than 60 characters
    // we'll cut it short at the next space
    if (lineEnd > 50) {
        lineEnd = text.indexOf(' ', lineEnd);
    }

    return text.substring(0, lineEnd);
};

export const TweetHelpers = {
    getTweetId,
    getFirstLine,
};

