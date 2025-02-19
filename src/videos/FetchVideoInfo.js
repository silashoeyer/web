export const fetchVideoInfo = async (videoId) => {
    const API_KEY = "AIzaSyB9TkEpEgW-J_jeB9SWtc2nEaS_-eE0LhE";
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items.length > 0) {
            const videoTitle = data.items[0].snippet.title;
            const channelName = data.items[0].snippet.channelTitle;
            const videoDurationISO = data.items[0].contentDetails.duration;
            const videoDuration = convertISOToTime(videoDurationISO);

            return { videoTitle, channelName, videoDuration };
        } else {
            return { videoTitle: "", channelName: "", videoDuration: "" };
        }
    } catch (error) {
        console.error("Error fetching video info: ", error);
        return { videoTitle: "", channelName: "", videoDuration: "" };
    }
};

const convertISOToTime = (isoDuration) => {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
};