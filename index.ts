import { ChatDownloader, LoopEventHandler } from './downloader';
import {js as beautify} from "js-beautify";


export async function download(videoId: string, handler: LoopEventHandler) : Promise<string> {
    // Validate videoId
    
    const downloader = new ChatDownloader();
    downloader.addLoopEventListener(handler);

    const comments = await downloader.downloadChat(videoId);
    const stringified = JSON.stringify(comments);
    const beautified = beautify(stringified);

    return beautified;
}