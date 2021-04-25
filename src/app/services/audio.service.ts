import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private nativeAudio:NativeAudio) { }

  async initSounds(id,url){
    // correct answer
    // await this.nativeAudio.preloadSimple(id,url); 
    await this.nativeAudio.preloadComplex(id,url,1,1,0); 

  }

  async playSound(id){
    const play = await this.nativeAudio.play(id);
    console.log('play')
  }

  async stopSound(id){
    const stop = await this.nativeAudio.stop(id);
    console.log('stop')
  }
}
