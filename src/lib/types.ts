

export type VodInfo = {
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