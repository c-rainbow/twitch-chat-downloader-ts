import { convertToTime } from './lib/stringutils';
import { DownloadStatus } from './lib/types';

type PropType = {
  lastChatOffset: number;
  totalSeconds: number;
  downloadStatus: DownloadStatus;
};

export default function Progress(props: PropType) {
  const { lastChatOffset, totalSeconds, downloadStatus } = props;

  const progressSeconds =
    downloadStatus === DownloadStatus.ENDED ? totalSeconds : lastChatOffset;
  const currentProgress =
    totalSeconds === 0 ? 0 : progressSeconds / totalSeconds;
  const currentTime = convertToTime(progressSeconds);
  const totalTime = convertToTime(totalSeconds);
  return (
    <>
      <progress
        className="progress progress-info w-80 h-4"
        value={progressSeconds}
        max={totalSeconds}
      />
      <div>
        Progress: {Math.floor(currentProgress * 100)}% ({currentTime}/
        {totalTime})
      </div>
    </>
  );
}
