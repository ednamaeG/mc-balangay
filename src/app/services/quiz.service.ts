import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { IQuestion, IQuiz } from '../interfaces/quiz';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes$ : BehaviorSubject<IQuiz[]> = new BehaviorSubject([]);
  constructor() { }

  async getQuizzes()  {
    try {
      const   ret  = await Storage.get({ key: 'quizzes' });
      console.log('Got item: ', ret.value);
      return JSON.parse(ret.value);
    } catch (err) {
      console.log(err)
    }
  }

  async storeQuizzes(data: IQuiz[]) {
    try {
      const quizzes = await Storage.set({
        key: 'quizzes',
        value: JSON.stringify(data)
      });
      console.log(quizzes,'stored')
      
    } catch (err) {
      console.log(err)
    }
  }
}
