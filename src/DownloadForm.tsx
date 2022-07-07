import { FormEvent } from 'react';
import { TWITCH_CLIENT_ID } from './lib/constants';
import { ChatDownloader } from './lib/downloader';
import { useStore } from './lib/states';


export default function DownloadForm() {
  const [videoInfo, setLastChatOffset, startDownload, endDownload] = useStore(
    (state) => [
      state.videoInfo,
      state.setLastChatOffset,
      state.startDownload,
      state.endDownload,
    ]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoInfo) {
      console.log('No VOD to download');
      return;
    }

    const videoId = videoInfo._id.slice(1); // _id starts with "v"
    console.log('Download starts with video', videoId);

    const downloader = new ChatDownloader(videoId, TWITCH_CLIENT_ID);
    const chats = [];
    let ended = false;
    startDownload();
    while (!ended) {
      const batchResult = await downloader.downloadNextBatch();
      console.log('offset', batchResult.lastChatOffset);
      chats.push(...batchResult.comments);
      setLastChatOffset(batchResult.lastChatOffset);
      ended = batchResult.ended;
    }
    endDownload();
    console.log('Downloaded', chats.length, 'chats');
  };

  return (
    <form
      className="download-form form-control flex items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-60">
        <label className="label cursor-pointer">
          <span className="label-text">Text</span>
          <input
            type="radio"
            name="radio-6"
            className="radio checked:bg-red-500"
            checked
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">JSON</span>
          <input
            type="radio"
            name="radio-6"
            className="radio checked:bg-blue-500"
            checked
          />
        </label>
        <input
          type="submit"
          className="btn btn-primary mt-3"
          value="Download"
        />
      </div>
    </form>
  );
}
