import { convertToTime, getFullUserName } from './lib/stringutils';
import { VodInfo } from './lib/types';

type PropType = {
  vodInfo: VodInfo;
};

export default function VodDetail({ vodInfo }: PropType) {
  if (!vodInfo) {
    // Render nothing when content is not ready
    return <></>;
  }
  const thumbnailSrc = vodInfo.preview?.medium;
  const username = vodInfo.channel?.name;
  const displayName = vodInfo.channel?.display_name;
  const channelName = getFullUserName(username, displayName);

  const startTime = new Date(vodInfo.created_at);

  return (
    <div className="vod-detail mt-5">
      <div className="flex justify-center">
        {thumbnailSrc && <img src={thumbnailSrc} width="320px" />}
      </div>
      <div className="mt-3 text-lg font-medium">Channel</div>
      <div>{channelName}</div>
      <div className="mt-3 text-lg font-medium">Title</div>
      <div>{vodInfo.title}</div>
      <div className="mt-3 text-lg font-medium">Stream Start Time</div>
      <div>{startTime.toLocaleString()}</div>
      <div className="mt-3 text-lg font-medium">Length</div>
      <div>{convertToTime(vodInfo.length)}</div>
    </div>
  );
}
