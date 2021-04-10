import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, NavController, NavParams } from '@ionic/angular'
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchInput: IonSearchbar;
  data = [];
  results = []
  warningMsg = 'Enter words to search'
  constructor(private modal: ModalController, private navParams: NavParams, private router: Router) {

  }

  ngOnInit() {
    this.data = this.navParams.get('data');
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 500)
  }

  closeModal() {
    this.modal.dismiss()
  }

  search(ev) {
    console.log('test')
    let query = ev.detail.value;
    if (query) {
      // this.results = this.data.filter(
      //   (data) => data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // );
      // this.results = this.data.filter(
      //   (data) => {
      //     return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      //   }
      // );

      this.results = this.data.filter(
        (data) => {
          const detail = data.details.find(f => {
            return f.content.toLowerCase().includes(query)
          })
          data.foundInfo = detail;
          return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || detail

        }
      );



      console.log('res1', this.results)


      // console.log('filtered',res)

      // console.log('res',detail)
      this.warningMsg = this.results.length == 0 ? "No Results Found." : "";
      console.log('results', this.results);
    }


  }

  openContent(content) {
    this.closeModal()

    if (content.foundInfo) {
      console.log(content.foundInfo)
      const data = JSON.stringify(content.foundInfo)
      // this.router.navigate(['/tabs/tab1/content',{content:data}])
      this.router.navigate(['/barangay-content', { data: data, name: content.name }])

    } else {
      const data = JSON.stringify(content)
      this.router.navigate(['/tabs/tab1/content', { content: data }])
    }

  }

  resetResults() {
    console.log('reset')
    this.results = [];
  }
}
