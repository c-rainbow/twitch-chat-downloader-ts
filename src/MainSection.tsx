import { useState } from 'react';
import DownloadForm from './DownloadForm';
import Progress from './Progress';
import VodDetail from './VodDetail';
import VodSearchForm from './VodSearchForm';

export default function MainSection() {
  const [vodInfo, setVodInfo] = useState(null);

  return (
    <div className="hero bg-base-200 pt-10">
      <div className="hero-content text-center">
        <div className="">
          <h1 className="text-3xl font-bold mb-6">Twitch VOD Chat Downloader</h1>
          <p className="py-1">Enter the video ID or URL</p>
          <p className="text-sm ">ex){' '}
            <span className="italic font-medium">https://twitch.tv/videos/123456789</span>
            {' '}or{' '}
            <span className="italic font-medium">123456789</span>
          </p>
          <VodSearchForm />
          {vodInfo && (
            <>
            <VodDetail vodInfo={vodInfo} />
            <DownloadForm />
            <Progress currentSeconds={3990} totalSeconds={5936}/>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
}
