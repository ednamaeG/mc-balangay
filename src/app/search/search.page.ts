import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, NavController, NavParams } from '@ionic/angular'
import { IBarangay } from '../interfaces/barangay';
import { HttpClient } from '@angular/common/http';
import { FilterPage } from '../filter/filter.page';
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
  filteredResults = [];
  tempResults = [];
  queryFilter: any;
  constructor(private modal: ModalController, private router: Router, private route: ActivatedRoute, private navCtrl: NavController, private httpClient: HttpClient) {

  }

  async ngOnInit() {
    // this.data = this.route.snapshot.params.data;
    this.data = await this.getData();
    this.results = this.data;
    console.log('DATA', this.data)
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 500)
  }

  closeModal() {
    this.navCtrl.pop()
  }

  async getData(): Promise<IBarangay[]> {
    return await this.httpClient.get<IBarangay[]>('./assets/mocks/barangays-mock.json').toPromise();
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
            return f.content.toLowerCase().includes(query.toLowerCase())
          })
          data.foundInfo = detail;
          return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || detail

        }
      );

      this.tempResults = this.results;


      console.log('res1', this.results)


      // console.log('filtered',res)

      // console.log('res',detail)
      if (this.queryFilter) {
        this.filterResults()
      }
      this.warningMsg = this.results.length == 0 ? "No Results Found." : "";
      console.log('results', this.results);
    }


  }

  openContent(content) {
    this.closeModal()

    const data = JSON.stringify(content)
      console.log('data', content)
      // this.router.navigate(['/tabs/tab1/content',{content:data}])
      // this.router.navigate(['/barangay-content', { data: data, name: content.name }])
      this.router.navigate(['/barangay', { content: data }])


    // if (content.foundInfo) {
    //   console.log(content.foundInfo)
    //   const found = JSON.stringify(content.foundInfo)
    //   const data = JSON.stringify(content)
    //   console.log('data', content)
    //   // this.router.navigate(['/tabs/tab1/content',{content:data}])
    //   // this.router.navigate(['/barangay-content', { data: data, name: content.name }])
    //   this.router.navigate(['/barangay', { content: data }])

    // }else{

    // }
    // else {
    //   const data = JSON.stringify(content)
    //   this.router.navigate(['/tabs/tab1/content', { content: data }])
    // }

  }

  resetResults() {
    console.log('reset')
    this.results = []
    this.results = this.data;
  }
  async showFilterModal() {
    const modal = await this.modal.create({
      component: FilterPage,
      componentProps: { data: this.queryFilter }
    });

    modal.present();

    modal.onDidDismiss().then((props) => {
      console.log('propss',props)
      if (props.data) {
        this.queryFilter = props.data;
        if(this.queryFilter.foundingYear.to || this.queryFilter.foundingYear.from || this.queryFilter.sort || this.queryFilter.population){
          console.log('props',props)
          this.results = this.data;
          this.queryFilter = props.data;
           
          this.filterResults()
        }else{
          this.queryFilter = null;
          this.results = this.data;
        }
       
        //   let filtered = []
        // filtered = this.results.filter(item => {
        //     console.log('data:::', this.queryFilter);
        //     return item.foundingYear <= this.queryFilter.foundingYear.to && item.foundingYear >= this.queryFilter.foundingYear.from
        //   });

        //   if (this.queryFilter.foundingYear.to && this.queryFilter.foundingYear.from) {
        //     filtered.forEach((data) =>{
        //       data.foundInfo = "Founding Year:" + data.foundingYear
        //     })
        //   }
        //   console.log("Filtered", filtered);
        //   let sorted = []
        //   if (this.queryFilter.sort == "foundingYear-Asc") {
        //     sorted = filtered.sort((a, b) => {
        //       return a.foundingYear - b.foundingYear;
        //     });
        //   } else if (this.queryFilter.sort == "foundingYear-Desc") {
        //     sorted = filtered.sort((a, b) => {
        //       return b.foundingYear - a.foundingYear;
        //     });
        //   } else if (this.queryFilter.sort == "name") {
        //     sorted = filtered.sort((a, b) => {
        //       return a.name - b.name;
        //     });
        //   }
        //   this.results = sorted;
        //   console.log('sorted', sorted)
      }else{
        this.results = []
        this.results = this.data;
        this.queryFilter = null;
      }
    })
  }

  filterResults() {
    let filtered = []
    if ((this.queryFilter.foundingYear.to && this.queryFilter.foundingYear.from) && !this.queryFilter.population) {
      filtered = this.results.filter(item => {
        console.log('data:::', this.queryFilter);
        return (item.foundingYear && item.foundingYear <= this.queryFilter.foundingYear.to && item.foundingYear >= this.queryFilter.foundingYear.from)
      });
    } else if ((this.queryFilter.foundingYear.to && this.queryFilter.foundingYear.from) && this.queryFilter.population) {
      filtered = this.results.filter(item => {
        console.log('data::: f', this.queryFilter);
        const queryPopulation = this.queryFilter.population == 5000 ? item.population < 5000 : item.population > 10000;
        return item.foundingYear <= this.queryFilter.foundingYear.to && item.foundingYear >= this.queryFilter.foundingYear.from || queryPopulation;
      });
    } else if ((this.queryFilter.foundingYear.to && this.queryFilter.foundingYear.from) || this.queryFilter.population) {
      filtered = this.results.filter(item => {
        console.log('data::: either', this.queryFilter);
        const queryPopulation = this.queryFilter.population == 5000 ? item.population < 5000 : item.population > 10000;
        return item.foundingYear <= this.queryFilter.foundingYear.to && item.foundingYear >= this.queryFilter.foundingYear.from || queryPopulation;
      });
    }
    // 
    // else if ((this.queryFilter.foundingYear.to && this.queryFilter.foundingYear.from)  && this.queryFilter.population) {
    //   filtered.forEach((data) => {
    //     const content = this.queryFilter.population ? "Population" + data.population : "Founding Year:" + data.foundingYear
    //     data.foundInfo = {
    //       type: "History",
    //       content: content
    //     }
    //   })
    // }
    if (this.queryFilter.sort == "foundingYear-Asc" || this.queryFilter.sort == "foundingYear-Desc") {
      filtered.forEach((data) => {
        data.foundInfo = {
          type: "History",
          content: data.foundingYear ? ("Founding Year: " + data.foundingYear) : ''  
        }
      })
    }
    // // founding
    else if (this.queryFilter.sort == "population-Asc" || this.queryFilter.sort == "population-Desc") {
      filtered.forEach((data) => {
        data.foundInfo = {
          type: "History",
          content: data.population ? "Population " + data.population :''
        }
      })
    }
    // // population
    // else if ((this.queryFilter.foundingYear.to && this.queryFilter.foundingYear.from) && !this.queryFilter.population) {
    //   filtered.forEach((data) => {
    //     data.foundInfo = {
    //       type: "History",
    //       content: "Founding Year: " + data.foundingYear
    //     }
    //   })
    // }
    
    if(filtered.length == 0 && !this.queryFilter.foundingYear.to && !this.queryFilter.foundingYear.from ){
      filtered  = this.results;
      if(this.queryFilter.sort ==  "foundingYear-Desc" || this.queryFilter.sort ==  "foundingYear-Asc"){
        filtered = filtered.filter(i =>{
          return i.foundingYear != '' && i.foundingYear;
        })
        console.log('FILTERED',filtered)
        filtered.forEach((data) => {
          data.foundInfo = {
            type: "History",
            content: data.foundingYear ? ("Founding Year: " + data.foundingYear) : ''  
          }
        })
      }else if(this.queryFilter.sort == "population-Desc" || this.queryFilter.sort == "population-Asc"){
        filtered = filtered.filter(i =>{
          return i.population != '' && i.population;
        })
        console.log('FILTERED POP',filtered)
        filtered.forEach((data) => {
          data.foundInfo = {
            type: "History",
            content: data.population ? "Population " + data.population :'' 
          }
        })
      }

    }
    let sorted = []
    if (this.queryFilter.sort == "foundingYear-Asc") {
      sorted = filtered.sort((a, b) => {
        // return a.foundingYear - b.foundingYear;
        return (a.foundingYear && b.foundingYear ) ? a.foundingYear - b.foundingYear : 0;
      });
    } else if (this.queryFilter.sort == "foundingYear-Desc") {
      sorted = filtered.sort((a, b) => {
        return b.foundingYear - a.foundingYear;
      });
    } else if (this.queryFilter.sort == "population-Desc") {
      
      sorted = filtered.sort((a, b) => {
        return b.population - a.population;
      });
    } else if (this.queryFilter.sort == "population-Asc") {
      sorted = filtered.sort((a, b) => {
        return a.population - b.population;
      });
    } else{
      sorted = filtered.sort((a, b) => {
        return a.name - b.name;
      });
    }
    this.results = sorted;
    this.warningMsg = this.results.length == 0 ? "No Results Found." : "";
    console.log('sorted', this.results)
  }

}
