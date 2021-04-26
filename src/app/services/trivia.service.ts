import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ITrivia } from '../interfaces/trivia';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor() { }

  async getTrivias()  {
    try {
      const   ret  = await Storage.get({ key: 'trivias' });
      console.log('Got item: ', ret.value);
      return JSON.parse(ret.value);
    } catch (err) {
      console.log(err)
    }
  }

  async storeTrivias(data: ITrivia[]) {
    try {
      const trivias = await Storage.set({
        key: 'trivias',
        value: JSON.stringify(data)
      });
      console.log(trivias)
      
    } catch (err) {
      console.log(err)
    }
  }
}
