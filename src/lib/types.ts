export type VodInfo = {
  _id: string;
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
};

export enum DownloadStatus {
  NOT_STARTED,
  DOWNLOADING,
  ENDED,
}
