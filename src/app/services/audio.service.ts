import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private nativeAudio:NativeAudio) { }

  async initSounds(id,url){
    // correct answer
    await this.nativeAudio.preloadSimple(id,url); 

  }

  async playSound(id){
    const play = await this.nativeAudio.play(id);
  }
}
