import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  
  async getSettings()  {
    try {
      const   ret  = await Storage.get({ key: 'settings' });
      console.log('Got setting: ', ret.value);
      return JSON.parse(ret.value);
    } catch (err) {
      console.log(err)
    }
  }

  async storeSettings(setting) {
    try {
      const quizzes = await Storage.set({
        key: 'settings',
        value: JSON.stringify(setting)
      });
      console.log(quizzes,'stored')
      
    } catch (err) {
      console.log(err)
    }
  }
}
