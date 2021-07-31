import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { apiUrl, BASE_URL } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class BarangayService {

  constructor(private http: HTTP, private afd: AngularFireDatabase) { }


  async getBarangays() {
    const address = `${apiUrl}/barangays`;
    console.log('address', address)

    try {
      const res = await this.http.get(address, {}, {});

      var data = JSON.parse(res.data)
      return data.map((item) => {
        // item.logoUrl = BASE_URL+item.logoUrl
        item.details.forEach(detail => {
          if (detail.photos.length >= 1) {
            detail.photos.map(photo => {
              photo.url = `${BASE_URL}${photo.url}`
            })
          }
        })
        return item;
      })


    } catch (err) {
      console.log('err', err)
    }

  }

  getDataList() {
    return new Promise<any>(res => {
      const ref = this.afd.database.ref("barangays/quizzes").orderByKey();
      ref.once("value").then(function (snapshot) {
        let data = [];
        snapshot.forEach(function (item) {

          data.push(item.val());
        });

        res(data);
      });
    });
  }


  // const items  = this.afd.list('barangays/barangay_data',ref => {
  //   return ref.orderByChild('id')

  //       }).valueChanges().toPromise();

  //       console.log(await items)
  // }

}
