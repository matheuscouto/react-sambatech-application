export interface Stylesheet {
  [name: string]: React.CSSProperties
}

export interface IVideoItem {
  id: string;
  name: string;
  thumbnails: string[];
  high: string;
  low: string;
  status: 'uploading' | 'encoding' | 'done' | 'failed';
  creationTime: number;
  creationTimeOrder: number;
}
