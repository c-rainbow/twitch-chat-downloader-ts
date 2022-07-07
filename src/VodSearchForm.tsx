import { FormEvent, useState } from 'react';
import { TWITCH_CLIENT_ID } from './lib/constants';
import { getVideoInfo } from './lib/search';
import { getVideoId } from './lib/stringutils';
import { useStore } from './lib/states';

export default function VodSearchForm() {
  const [vodIdOrUrl, setVodIdOrUrl] = useState<string>('');
  const [searchError, setSearchResult, setSearchError] = useStore((state) => [
    state.searchError,
    state.setSearchResult,
    state.setSearchError,
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    console.log(vodIdOrUrl);

    const videoId = getVideoId(vodIdOrUrl);
    console.log('videoId:', videoId);
    if (!videoId) {
      setSearchError(`"${vodIdOrUrl}" is not a valid video ID or URL.`);
      return;
    }

    const { status, content } = await getVideoInfo(videoId, TWITCH_CLIENT_ID);
    if (!content) {
      setSearchError(`Cannot find a video with ID "${videoId}".`);
      return;
    }

    setSearchResult(content);
  };

  return (
    <form className="vod-search-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <div className="input-group justify-center">
          <input
            type="text"
            placeholder="VOD ID here"
            value={vodIdOrUrl}
            onChange={(e) => setVodIdOrUrl(e.target.value)}
            className="input input-bordered w-72 focus:outline-none"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        {searchError && (
          <div className="ty-1 text-sm text-red-600">{searchError}</div>
        )}
      </div>
    </form>
  );
}
