
const TOO_MANY_REQUESTS = 429; // HTTP 429 too many requests response code
const ALL_COMMENTS_DOWNLOADED = 404;
const INTERNAL_ERROR = 500;

export interface DownloadResponse {
  comments: Array<any>;
  _next?: string;
}

export interface FetchResponse {
  status: number;
  content?: DownloadResponse;
}

export interface BatchResult {
  turn: number;
  status: number;
  totalDownload: number;
  lastChatOffset: number;
  ended: boolean;
  comments: Array<any>;
}

// TypeScript does not allow parametrized string to be formatted in runtime,
// so this is the best way to get a formatted URL.
function getApiUrl(videoId: string, nextCursor?: string): string {
  if (nextCursor) {
    return `https://api.twitch.tv/v5/videos/${videoId}/comments?cursor=${nextCursor}`;
  }
  return `https://api.twitch.tv/v5/videos/${videoId}/comments`;
}

export class ChatDownloader {
  private _videoId: string;
  private _totalDownload: number;
  private _lastChatOffset: number;
  private _ended: boolean;
  private _nextCursor?: string;
  private _turn: number;
  private _clientId: string;

  constructor(videoId: string, clientId: string) {
    this._videoId = videoId;
    this._totalDownload = 0;
    this._lastChatOffset = 0;
    this._ended = false;
    this._nextCursor = '';
    this._turn = 0;
    this._clientId = clientId;
  }

  // Download chat of single Twitch video
  async downloadNextBatch(): Promise<BatchResult> {
    // Do not progress more if all chats were downloaded
    if (this._ended) {
      return {
        turn: this._turn,
        status: ALL_COMMENTS_DOWNLOADED,
        totalDownload: this._totalDownload,
        lastChatOffset: this._lastChatOffset,
        ended: true,
        comments: [],
      };
    }

    // Try next turn
    this._turn += 1;
    try {
      const response = await this.callApi();

      const content = response.content;
      if (!content) {
        return {
          turn: this._turn,
          status: response.status,
          totalDownload: this._totalDownload,
          lastChatOffset: this._lastChatOffset,
          ended: false,
          comments: [],
        };
      }

      this._nextCursor = content._next;
      if (!content._next) {
        this._ended = true;
      }

      this._totalDownload += content.comments.length;

      return {
        turn: this._turn,
        status: response.status,
        totalDownload: this._totalDownload,
        lastChatOffset: this._lastChatOffset,
        ended: this._ended,
        comments: content.comments,
      };
    } catch (err) {
      console.error(`Error while downloading chats: ${err}`);

      return {
        turn: this._turn,
        status: INTERNAL_ERROR,
        totalDownload: this._totalDownload,
        lastChatOffset: this._lastChatOffset,
        ended: false,
        comments: [],
      };
    }
  }

  // Call Twitch API one time
  private async callApi(): Promise<FetchResponse> {
    const url = getApiUrl(this._videoId, this._nextCursor);
    const response = await fetch(url, { headers: this.getDefaultHeaders() });
    if (!response.ok) {
      return { status: response.status };
    }

    const content = await response.json();
    return { status: response.status, content };
  }

  private getDefaultHeaders() {
    return {
      'Client-ID': this._clientId,
      Accept: 'application/vnd.twitchtv.v5+json',
    };
  }
}