import create from 'zustand';
import { DownloadStatus, VodInfo } from './types';

type State = {
  videoInfo: VodInfo | null;
  searchError: string;
  lastChatOffset: number;
  downloadStatus: DownloadStatus;

  setSearchResult: (videoInfo: VodInfo) => void;
  setSearchError: (message: string) => void;
  setLastChatOffset: (offset: number) => void;
  startDownload: () => void;
  endDownload: () => void;
};

export const useStore = create<State>((set) => ({
  videoInfo: null,
  searchError: '',
  lastChatOffset: 0,
  downloadStatus: DownloadStatus.NOT_STARTED,

  setSearchResult: (videoInfo: VodInfo) =>
    set({
      videoInfo,
      searchError: '',
      lastChatOffset: 0,
      downloadStatus: DownloadStatus.NOT_STARTED,
    }),
  setSearchError: (message: string) =>
    set({
      videoInfo: null,
      searchError: message,
      lastChatOffset: 0,
      downloadStatus: DownloadStatus.NOT_STARTED,
    }),
  setLastChatOffset: (lastChatOffset: number) => set({ lastChatOffset }),
  startDownload: () => set({ downloadStatus: DownloadStatus.DOWNLOADING }),
  endDownload: () => set({ downloadStatus: DownloadStatus.ENDED }),
}));
