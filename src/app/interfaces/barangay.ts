
export interface IBarangay {
  id: string;
  name: string;
  width?: number;
  height?: number;
  download_url?: string;
  facebookLink: string;
  websiteLink: string;
  details: IBarangayDetail[];
  logo_url: string;
  photos: IPhoto[];
  foundInfo?:IBarangayDetail;
  foundingYear?:number;
  population?:number;
  malePopulation?:number;
  femalePopulation?:number;
  statistics?:IStats;
  politicians?:IPolitician[];
  status?: number;
  type?:number;
}

export interface IStats{
  data: IStatData[];
  currentYear:string;
  total?:number;
}

export interface IStatData{
  label:string;
  value:number
}
export interface IBarangayDetail {
  type: string;
  content: string;
  politicians?: IPolitician[];
  images?:IPhoto[];
  videoUrl?:string;
  photos?:IPhoto[];
}

export interface IPolitician {
  name: string;
  year: string;
}

export interface IPhoto {
  url: string;
  title?: string;
}
