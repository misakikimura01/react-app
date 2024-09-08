// タイマーの効果音
declare module 'howler' {
  export class Howl {
    constructor(options: HowlOptions);
    play(): void;
    pause(): void;
    stop(): void;
    volume(vol: number): void;
    seek(seek: number): void;
    on(event: string, callback: () => void): void;
    off(event: string, callback?: () => void): void;
  }

  export interface HowlOptions {
    src: string[];
    volume?: number;
    loop?: boolean;
    autoplay?: boolean;
    preload?: boolean;
    mute?: boolean;
    rate?: number;
    pool?: number;
    format?: string[];
    xhr?: {
      method?: string;
      headers?: Record<string, string>;
      withCredentials?: boolean;
    };
    html5?: boolean;
  }
}

