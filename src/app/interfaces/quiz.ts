export interface IQuiz {
    id: number;
    title: string;
    questions: IQuestion[];
    total_score: number;
    percentage: number;
    points: string;
    answer_count: number;
    progress:number;
}

export interface IQuestion {
    id: number;
    question: string;
    points: number;
    choices: IChoice[];
}

export interface IChoice {
    title: string,
    correct: boolean;
    selected?: boolean;
}