/*
 * Pass in milliseconds
 *
 * hint:
 *  if you have seconds just multiply the value by 1000
 *  if you have a string just use parseInt(num, 10)
 */
export function msToTime(duration) {
    const milliseconds = parseInt(((duration % 1000) / 100).toString(), 10);
    const seconds = parseInt(((duration / 1000) % 60).toString(), 10);
    const minutes = parseInt(((duration / (1000 * 60)) % 60).toString(), 10);
    const hours = parseInt(((duration / (1000 * 60 * 60)) % 24).toString(), 10);

    const hoursStr = hours < 10 ? "0" + hours : hours;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;

    return hoursStr + ":" + minutesStr + ":" + secondsStr + "." + milliseconds;
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    }
}

export function transformTimeStampToMS(timeStamp) {
    return new Date("1970-01-01T" + timeStamp + "Z").getTime();
}

/*
 * https://regex101.com/r/mI2aR7/1
 */
export function isValidTimeStamp(timeStamp) {
    const timeStampRegex = /^(([0-1][0-9])|([2][0-3])):([0-5][0-9])(:[0-5][0-9](?:[.]\d{1,3})?)?$/;
    return !!timeStamp.match(timeStampRegex);
}

export function YouTubeGetID(url) {
    if (!url) {
        return "";
    }
    const videoID = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,
    );
    return videoID && videoID[1];
}

export function YouTubeGetIDTwo(url) {
    if (!url) {
        return "";
    }
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : "";
}
