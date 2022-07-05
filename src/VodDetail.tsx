

type PropType = {
  vodInfo: {
    streamer: string;
    title: string;
    startTime: string;
    length: string;
  };
}


export default function VodDetail({ vodInfo }: PropType) {
  

  return (
    <div className="vod-detail">
      <div className="flex justify-center">
        <img
          src="https://placeimg.com/400/300/arch"
          width="200px"
          height="200px"
        />
      </div>
      <div className="">Defails</div>
    </div>
  );
}
