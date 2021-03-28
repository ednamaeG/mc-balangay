import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private nativeAudio:NativeAudio) { }

  async initSounds(id){
    // correct answer
    await this.nativeAudio.preloadSimple(id, 'assets/sounds/correct_answer.mp3'); 

  }

  async playSound(id){
    const play = await this.nativeAudio.play(id);
  }
}
