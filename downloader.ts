
import fetch from 'node-fetch'; 

import { getApiUrl, defaultHeaders } from './config';

const tooManyRequests = 429;  // HTTP 429 too many requests response code


async function sleep(ms: number) : Promise<any> {
    return new Promise(_ => setTimeout(_, ms));
}


export interface FetchResponse {
    status: number;
    text: string;
}


export class ChatDownloader {
    constructor() {

    }

    // Download chat of single Twitch video
    async downloadChat(videoId: string) : Promise<Array<any>> {
        const comments = [];
        let turn = 0;
        let nextCursor : string = null;
        do {
            const response = await this.callApi(videoId, nextCursor);
            if(response.text) {  // response.text is null if status is not ok.
                try {
                    const jsonContent = JSON.parse(response.text);
                    for(let newComment of jsonContent["comments"]) {
                        comments.push(newComment);
                    }
                    nextCursor = jsonContent["_next"];
                    console.log("Download turn: " + turn);
                    turn += 1;
                }
                catch(err) {
                    console.error(`Error when parsing JSON response: ${response.text}`);
                    return null;
                }
            }
            else if(response.status == tooManyRequests) {
                // As of 2020-07-25, Kraken API does not seem to use 429 response code at all.
                // This sleep is here only as an additional check
                await sleep(1000);  // Sleep for 1 second
            }
            else {
                console.error(`API call failed with error code: ${response.status}`);
                return null;
            }
        } while(nextCursor);

        return comments;
    }

    // Call Twitch API one time
    private async callApi(videoId: string, cursor: string) : Promise<FetchResponse> {
        const url = getApiUrl(videoId, cursor);
        const response = await fetch(url, {headers: defaultHeaders});
        if(!response.ok) {
            return {status: response.status, text: null};
        }
        const content = await response.text();
        return {status: response.status, text: content};
    }
}
