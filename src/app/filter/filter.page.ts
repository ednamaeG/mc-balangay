import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  categories = [
    {
      name: "history",
      isChecked: false
    }, {
      name: "branding",
      isChecked: false
    }, {
      name: "fiesta",
      isChecked: false
    }, {
      name: "politician",
      isChecked: false
    }
  ]
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  applyFilter(){
    const filter = {
      sort: "Name",
      categories:this.categories
    }

    this.modalCtrl.dismiss(filter);
  }
}
