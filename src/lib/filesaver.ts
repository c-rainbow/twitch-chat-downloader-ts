import streamSaver from 'streamsaver';
import { VodInfo } from './types';

export interface FileSaver {
  start: () => void;
  addChats: (chats: any[]) => void;
  finalize: () => void;
}

function encode(content: string): Uint8Array {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(content);
  return encoded;
}

export class JsonFileSaver {
  private _writer: WritableStreamDefaultWriter<any>;
  private _vodInfo: VodInfo;
  private _isFirstChat: boolean;

  constructor(vodInfo: VodInfo) {
    const filename = `chat_${vodInfo._id}.json`;
    streamSaver.mitm = process.env.PUBLIC_URL + '/mitm.html';
    const fileStream = streamSaver.createWriteStream(filename);
    this._writer = fileStream.getWriter();
    this._vodInfo = vodInfo;
    this._isFirstChat = true;
  }

  async start() {
    const vodJsonString = JSON.stringify(this._vodInfo, null, 2);
    await this._writer.write(
      encode(`{"video": ${vodJsonString},\n"comments": [\n`)
    );
  }

  async addChats(chats: any[]) {
    for (const chat of chats) {
      const chatJsonString = JSON.stringify(chat, null, 2);
      if (this._isFirstChat) {
        await this._writer.write(encode(chatJsonString));
      }
      this._isFirstChat = false;
      await this._writer.write(encode(`,\n${chatJsonString}`));
    }
  }

  async finalize() {
    this._writer.write(encode(']}'));
    this._writer.close();
  }
}
