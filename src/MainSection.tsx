import DownloadForm from './DownloadForm';
import { DownloadStatus } from './lib/types';
import Progress from './Progress';
import VodDetail from './VodDetail';
import VodSearchForm from './VodSearchForm';
import { useStore } from './lib/states';

export default function MainSection() {
  const [videoInfo, searchError, lastChatOffset, downloadStatus] = useStore(
    (state) => [
      state.videoInfo,
      state.searchError,
      state.lastChatOffset,
      state.downloadStatus,
    ]
  );

  return (
    <div className="hero bg-base-200 pt-10">
      <div className="hero-content text-center">
        <div className="">
          <h1 className="text-3xl font-bold mb-6">
            Twitch VOD Chat Downloader
          </h1>
          <p className="py-1">Enter the video ID or URL</p>
          <p className="text-sm ">
            ex){' '}
            <span className="italic font-medium">
              https://twitch.tv/videos/123456789
            </span>{' '}
            or <span className="italic font-medium">123456789</span>
          </p>
          <VodSearchForm />
          {videoInfo && (
            <>
              <VodDetail vodInfo={videoInfo} />
              <DownloadForm />
            </>
          )}
          {downloadStatus !== DownloadStatus.NOT_STARTED && (
            <Progress
              lastChatOffset={lastChatOffset}
              totalSeconds={videoInfo?.length || 0}
              downloadStatus={downloadStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
