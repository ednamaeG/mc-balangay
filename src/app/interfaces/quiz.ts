export interface IQuiz {
    id: number;
    title: string;
    questions: IQuestion[];
    total_score: number;
    percentage: number;
    points: string;
    answer_count: number;
    progress:number;
    status?:number;
}

export interface IQuestion {
    id: number;
    question: string;
    points: number;
    choices: IChoice[];
    hasAnswer?:boolean;
    status?:number;
}

export interface IChoice {
  choice: string;
    title?: string,
    correct: boolean;
    selected?: any;
}
