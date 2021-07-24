import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {apiUrl,BASE_URL} from '../../environments/environment'
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

      var data = JSON.parse(res.data)
      return data.map((item) =>{
        // item.logoUrl = BASE_URL+item.logoUrl
        item.details.forEach(detail =>{
          if(detail.photos.length >= 1){
            detail.photos.map(photo =>{
              photo.url = `${BASE_URL}${photo.url}`
            })
          }
        })
        return item;
      })


    }catch(err){
      console.log('err',err)
    }

  }
}
