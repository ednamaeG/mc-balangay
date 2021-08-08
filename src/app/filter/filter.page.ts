import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import {
	FormBuilder,
	FormGroup,
  	Validators
} from '@angular/forms';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  public form :FormGroup;
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
    population: '',

  }
  constructor(private modalCtrl: ModalController,private navParams:NavParams,private alertController:AlertController) { }

  ngOnInit() {
    const data = this.navParams.get("data")
    if(data){
      this.filter = data;
    }
    console.log('TEST::',this.filter,data)
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
      if(this.filter.foundingYear.from > this.filter.foundingYear.to){
        this.presentAlert()
      }else{
         console.log('dismissed')
        this.modalCtrl.dismiss(this.filter);
      }

    }else{
      this.modalCtrl.dismiss('')
    }

  }

  resetFilter(){
    // this.filter = {
    //   sort: null,
    //   // categories: this.categories,
    //   foundingYear: {
    //     from: null,
    //     to: null
    //   },
    //   population: null,

    // }

    // this.filter.population = '';
    // this.filter.sort = '';
    // this.filter.foundingYear.from='';
    // this.filter.population = '';
    // this.filter.foundingYear.to;
    this.modalCtrl.dismiss('')
    console.log('filter',this.filter)
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'MC Balangay',
      // subHeader: 'Subtitle',
      message: 'Invalid Founding Year Filter Range',
      buttons: ['OK']
    });

    await alert.present();
  }
}
