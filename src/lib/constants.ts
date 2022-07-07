const TOO_MANY_REQUESTS = 429; // HTTP 429 too many requests response code
const ALL_COMMENTS_DOWNLOADED = 404;
const INTERNAL_ERROR = 500;
export const VIDEO_NOT_EXISTS = 400; // Video with the ID does not exist
export const UNKNOWN_ERROR = 600; // Non-existing HTTP status code, just used here

export const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID!;
