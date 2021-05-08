import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
  ];
  foundingYear = {
    to: null,
    from: null
  }
  sortBy = ''
  populationNumber = '';

  filter = {
    sort: '',
    // categories: this.categories,
    foundingYear: {
      from: '',
      to: ''
    },
    population: ''
  }
  constructor(private modalCtrl: ModalController,private navParams:NavParams) { }

  ngOnInit() {
    const data = this.navParams.get("data")
    if(data){
      this.filter = data;
    }
    console.log('TEST',this.filter,data)
  }

  applyFilter() {
    // const filter = {
    //   sort: this.sortBy,
    //   categories: this.categories,
    //   foundingYear: this.foundingYear,
    //   population: this.populationNumber
    // }
    console.log("filter", this.filter)
    if(this.filter.foundingYear.to || this.filter.foundingYear.from || this.filter.sort || this.filter.population){
      this.modalCtrl.dismiss(this.filter);
    }else{
      this.modalCtrl.dismiss('')
    }
    
  }

  resetFilter(){
    this.filter = {
      sort: '',
      // categories: this.categories,
      foundingYear: {
        from: '',
        to: ''
      },
      population: ''
    }
    console.log('filter',this.filter)
  }
}
