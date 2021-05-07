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
}

export interface IBarangayDetail {
    type: string;
    content: string;
    politicians?: IPolitician[];
    images?:IPhoto[]
}

export interface IPolitician {
    name: string;
    year: string;
}

export interface IPhoto {
    url: string;
    title?: string;
}