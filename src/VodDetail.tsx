import { convertToTime, getFullUserName } from './lib/stringutils';


type PropType = {
  vodInfo: {
    content: {
      streamer: string;
      title: string;
      created_at: string;
      startTime: string;
      length: number;
      preview: {
        small: string;
        medium: string;
        large: string;
      };
      channel: {
        name: string;
        display_name: string;
      };
    }
  };
}


export default function VodDetail({ vodInfo }: PropType) {

  const { content } = vodInfo;

  if (!content) {  // Render nothing when content is not ready
    return <></>;
  }
  const thumbnailSrc = content.preview?.medium;
  const username = content.channel?.name;
  const displayName = content.channel?.display_name;
  const channelName = getFullUserName(username, displayName);

  const startTime = new Date(content.created_at);
  
  return (
    <div className="vod-detail mt-5">
      <div className="flex justify-center">
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            width="320px"
          />
        )}
      </div>
      <div className="mt-3 text-lg font-medium">Channel</div>
      <div>{channelName}</div>
      <div className="mt-3 text-lg font-medium">Title</div>
      <div>{content.title}</div>
      <div className="mt-3 text-lg font-medium">Stream Start Time</div>
      <div>{startTime.toLocaleString()}</div>
      <div className="mt-3 text-lg font-medium">Length</div>
      <div>
        {convertToTime(content.length)}
      </div>

    </div>
  );
}
