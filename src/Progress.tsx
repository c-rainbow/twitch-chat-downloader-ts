import { convertToTime } from './lib/stringutils';

type PropType = {
  currentSeconds: number;
  totalSeconds: number;
};

export default function Progress(props: PropType) {
  const { currentSeconds, totalSeconds } = props;

  const currentProgress =
    totalSeconds === 0 ? 0 : currentSeconds / totalSeconds;
  const currentTime = convertToTime(currentSeconds);
  const totalTime = convertToTime(totalSeconds);
  return (
    <>
      <progress
        className="progress progress-info w-80 h-4"
        value={currentSeconds}
        max={totalSeconds}
      />
      <div>
        Progress: {Math.floor(currentProgress * 100)}% ({currentTime}/
        {totalTime})
      </div>
    </>
  );
}
