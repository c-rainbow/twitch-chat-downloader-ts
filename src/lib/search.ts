import { UNKNOWN_ERROR } from "./constants";


// Download chat of single Twitch video
export async function getVideoInfo(videoId: string, clientId: string): Promise<any> {
  
  try {
    const url = `https://api.twitch.tv/v5/videos/${videoId}`;
    const response = await fetch(url, {
      headers:  {
        'Client-ID': clientId,
        Accept: 'application/vnd.twitchtv.v5+json',
      }
    });
    
    if (!response.ok) {
      return { status: response.status };
    }

    const content = await response.json();
    return { status: response.status, content };

  } catch (err) {
    console.error(`Error while downloading chats: ${err}`);
    return { status: UNKNOWN_ERROR };
  }
}
