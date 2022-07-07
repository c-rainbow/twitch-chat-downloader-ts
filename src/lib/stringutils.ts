

const VIDEOS_KEY = '/videos/';


export function getFullUserName(username: string, displayName: string) {
  if (!displayName) {
    return username;
  }

  if (username.toLocaleUpperCase() === displayName.toLocaleUpperCase()) {
    return displayName;
  }
  return `${displayName}(${username})`;
}


export function convertToTime(timeInSeconds: number): string {
  let intTime = Math.floor(timeInSeconds);
  const seconds = intTime % 60;
  intTime = Math.floor(intTime / 60);
  const minutes = intTime % 60;
  intTime = Math.floor(intTime / 60);
  return `${intTime}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


export function getVideoId(videoIdOrUrl: string): string | null {
  if (!videoIdOrUrl) {
    console.log('empty video ID or url')
    return null;
  }
  let input = videoIdOrUrl.trim();
  if (input.match(/^[0-9]+$/g)) {
    console.log('input matches');
    return input;
  }
  console.log('didnt match numbers', input)
  return getVideoIdFromUrl(input);
}


// Input should be a form of https://(www.)?twitch.tv/videos/{videoId}
export function getVideoIdFromUrl(url: string): string | null {
  const videosIndex = url.indexOf(VIDEOS_KEY);
  if (videosIndex === -1) {
    return null;
  }

  const startIndex = videosIndex + VIDEOS_KEY.length;
  const endIndex = url.indexOf('/', startIndex);
  if (endIndex === -1) {
    return url.substring(startIndex);
  }
  return url.substring(startIndex, endIndex);
}