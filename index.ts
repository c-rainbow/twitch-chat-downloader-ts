import { ChatDownloader } from "./downloader";


// Video ID can be found in URL https://twitch.tv/videos/OOOOOOOOO
const videoId = "";


async function main() {
    const downloader = new ChatDownloader();
    const comments = await downloader.downloadChat(videoId);
    console.log("comments length: " + comments.length);
}


main();