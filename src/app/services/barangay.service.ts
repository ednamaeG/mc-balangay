import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {apiUrl} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class BarangayService {

  constructor(private http:HTTP) { }


  async getBarangays(){
    const address = `${apiUrl}/barangays`;
    console.log('address',address)
    try{
      const res = await this.http.get(address,{},{});
      return JSON.parse(res.data);
    }catch(err){
      console.log('err',err)
    }

  }
}
