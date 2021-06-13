import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { IQuestion, IQuiz } from '../interfaces/quiz';
const { Storage } = Plugins;
import { apiUrl } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes$ : BehaviorSubject<IQuiz[]> = new BehaviorSubject([]);
  constructor(private http:HTTP) { }

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

  async getQuizList(){
    const address = `${apiUrl}/quizzes`;
    console.log('address',address)
    try{
      const res = await this.http.get(address,{},{});
      return JSON.parse(res.data);
    }catch(err){
      console.log('err',err)
    }

  }
}
