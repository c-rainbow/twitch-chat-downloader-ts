import { FormEvent, useState } from 'react';
import { TWITCH_CLIENT_ID } from './lib/constants';
import { ChatDownloader } from './lib/downloader';
import { useStore } from './lib/states';
import { DownloadStatus } from './lib/types';


enum FileType {
  TEXT = 'text',
  JSON = 'json',
}


const saveToFile = (output: string, videoId: string) => {
  const blob = new Blob([output], {type: "application/json"});
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `chats_${videoId}.json`;

  const clickHandler = () => {
      setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          //this.removeEventListener('click', clickHandler);
      }, 150);
  };

  a.addEventListener('click', clickHandler, false);
  a.click();
};


export default function DownloadForm() {
  const [videoInfo, setLastChatOffset, startDownload, endDownload, downloadStatus] = useStore(
    (state) => [
      state.videoInfo,
      state.setLastChatOffset,
      state.startDownload,
      state.endDownload,
      state.downloadStatus,
    ]
  );

  const [fileFormat, setFileFormat] = useState<FileType>(FileType.TEXT);
  const [stopped, setStopped] = useState<boolean>(false);

  const handleFormatChange = (e: any) => {
    console.log('value:', e.target.value);
    setFileFormat(e.target.value);
  }

  const cancelDownload = () => {
    setStopped(true);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('File format:', fileFormat);
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
    while (!ended && !stopped) {
      const batchResult = await downloader.downloadNextBatch();
      console.log('offset', batchResult.lastChatOffset);
      chats.push(...batchResult.comments);
      setLastChatOffset(batchResult.lastChatOffset);
      ended = batchResult.ended;
    }
    endDownload();
    console.log('Downloaded', chats.length, 'chats');

    if (stopped) {
      return;
    }

    const output = {
      video: videoInfo,
      chats,
    };

    const outputString = JSON.stringify(output, null, 2);
    saveToFile(outputString, videoId);
  };

  return (
    <form
      className="download-form form-control flex items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-60">
        <label className="label cursor-pointer">
          <span className="label-text">JSON</span>
          <input
            type="radio"
            name="file-format"
            value={FileType.JSON}
            className="radio checked:bg-blue-500"
            checked
            onChange={handleFormatChange}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Text</span>
          <input
            type="radio"
            name="file-format"
            value={FileType.TEXT}
            className="radio checked:bg-red-500"
            checked
            onChange={handleFormatChange}
          />
        </label>
        {downloadStatus !== DownloadStatus.DOWNLOADING && (
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Download"
          />
        )}
        {downloadStatus === DownloadStatus.DOWNLOADING && (
          <button className="btn btn-primary mt-3" onClick={cancelDownload}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
