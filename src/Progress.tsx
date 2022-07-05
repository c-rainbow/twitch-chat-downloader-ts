

type PropType = {
  currentSeconds: number;
  totalSeconds: number;
}


function convertToTime(timeInSeconds: number): string {
  let intTime = Math.floor(timeInSeconds);
  const seconds = intTime % 60;
  intTime = Math.floor(intTime / 60);
  const minutes = intTime % 60;
  intTime = Math.floor(intTime / 60);
  return `${intTime}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


export default function Progress(props: PropType) {
  const { currentSeconds, totalSeconds } = props;

  const currentProgress = totalSeconds === 0 ? 0 : currentSeconds / totalSeconds;
  const currentTime = convertToTime(currentSeconds);
  const totalTime = convertToTime(totalSeconds);
  return (
    <>
      <progress
        className="progress progress-info w-80 h-4"
        value={currentSeconds}
        max={totalSeconds}
      />
      <div>Progress: {Math.floor(currentProgress * 100)}% ({currentTime}/{totalTime})</div>
    </>
  );
}
