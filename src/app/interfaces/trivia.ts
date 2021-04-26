export interface ITrivia {
    id:number;
    triviaQuestion:string;
    info:string;
    choices:ITriviaChoice[];
    images:ITriviaImage[];
    isAnswered:boolean;
}

export interface ITriviaChoice {
    title:string;
    correct:boolean;
    selected?:boolean;
}

export interface ITriviaImage{
    title:string;
    url:string;
}