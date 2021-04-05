export interface IBarangay {
    id: string;
    name: string;
    width?: number;
    height?: number;
    download_url?: string;
    facebookLink: string;
    websiteLink: string;
    details: IBarangayDetail[];
    logo_url:string;
}

export interface IBarangayDetail {
    type: string;
    content: string;
}