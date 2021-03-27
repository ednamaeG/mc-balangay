export interface IQuiz {
    title: string;
    questions: IQuestion[];
    total_score:number;
    points: string;
    answer_count:number;
}

export interface IQuestion {
    id: number;
    question: string;
    percentage:number;
    choices: IChoice[];
}

export interface IChoice {
    title: string,
    correct: boolean;
    selected?:boolean;
}