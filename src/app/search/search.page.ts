import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonSearchbar,
  ModalController,
  NavController,
  NavParams,
} from '@ionic/angular';
import { IBarangay } from '../interfaces/barangay';
import { HttpClient } from '@angular/common/http';
import { FilterPage } from '../filter/filter.page';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchInput: IonSearchbar;
  data = [];
  results = [];
  warningMsg = 'Enter words to search';
  filteredResults = [];
  tempResults = [];
  queryFilter: any;
  RESULT_TYPES = {
    BARANGAY_CONTENT: 1,
    BARANGAY_CAPTAIN: 2,
    MABALACAT_DETAIL: 3,
    MABALACAT_MAYOR: 4,
    POPULAR_PLACE: 5,
    POPULAR_PERSONALITY:6
  };
  politicians: any;
  places: any;
  personalities: any;
  mabalacat_details: any;

  constructor(
    private modal: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private httpClient: HttpClient,
    private afd: AngularFireDatabase
  ) {}

  async ngOnInit() {
    // this.data = this.route.snapshot.params.data;
    // this.data = await this.getData();
    this.afd
      .list('barangays/barangay_data')
      .valueChanges()
      .forEach(async (val: IBarangay[]) => {
        console.log('BRGY::', val);
        const list = val;
        this.data = list.filter((l) => Number(l.status) == 1);
        this.results = this.data;
      });

      this.afd.list('barangays/mabalacat-details/').valueChanges().forEach(async (val: any[]) => {

        this.mabalacat_details = val
        console.log("MABALACAT DETAILS ALL",this.mabalacat_details)
      })


      this.afd.list('barangays/mabalacat-details/politicians').valueChanges().forEach(async (val: any[]) => {

        this.politicians = val
        console.log('POOLITICIANS',this.politicians)
      })

      this.afd.list('barangays/mabalacat-details/places').valueChanges().forEach(async (val: any[]) => {

        this.places = val
        console.log('PLACES',this.places)
      })

      this.afd.list('barangays/mabalacat-details/personalities').valueChanges().forEach(async (val: any[]) => {
        this.personalities = val
        console.log('PERSONALITIES',this.personalities)
      })  

    console.log('DATA', this.data);
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 500);
  }

  closeModal() {
    // this.navCtrl.pop()
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

  async getData(): Promise<IBarangay[]> {
    return await this.httpClient
      .get<IBarangay[]>('./assets/mocks/barangays-mock.json')
      .toPromise();
  }

  search(ev) {
    let query = ev.detail.value;
    if (query) {
     this.results = this.data.filter((data) => {
        const detail = data.details.find((f) => {
          return f.content.toLowerCase().includes(query.toLowerCase());
        });

        data.foundInfo = detail;
        data.type = this.RESULT_TYPES.BARANGAY_CONTENT;
        console.log('test content serar', detail);
        return (
          data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || detail
        );
      });
     
     if(this.results.length == 0){
      const captain_res = this.data.filter((data) => {
        const detail = data.politicians.find((f) => {
          return f.name.toLowerCase().includes(query.toLowerCase());
        });

        data.foundInfo = detail;
      
        data.type = this.RESULT_TYPES.BARANGAY_CAPTAIN;
        console.log('test content serar', detail);
        return (
          data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || detail
        );
      });

      

      if(captain_res.length > 0 ){
        // this.results = captain_res;
        this.results = this.results.concat(captain_res)

      }else{
        console.log('SHOULD SEARCH MORE FOR MABALACAT POPULAR PLACES...')
        const places_res = this.places.filter((data) => {
        
          data.type = this.RESULT_TYPES.POPULAR_PLACE;
         
          return (
            data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||  data.content.toLowerCase().indexOf(query.toLowerCase()) !== -1 
          );
        });
        console.log('popular place res',places_res)

        if(places_res.length > 0 ){
          // this.results = places_res;
          this.results = this.results.concat(places_res)

        }else{
  
          const mayors_res = this.politicians[0].data.filter((data) => {
        
            data.type = this.RESULT_TYPES.MABALACAT_MAYOR;
            data.category = 'Municipal Mayor'
            return (
              data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 
            );
          });
          
          if(mayors_res.length > 0 ){
            this.results = mayors_res;
            
          }else{
            console.log('should search more...')
            const presidentes_res = this.politicians[1].data.filter((data) => {
        
              data.type = this.RESULT_TYPES.MABALACAT_MAYOR;
              data.category = 'Presidentes  Municipales'
              return (
                data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 
              );
            });

            if(presidentes_res.length > 0 ){
              // this.results = presidentes_res;
              
              this.results = this.results.concat(presidentes_res)
            }else{
              console.log('should search more personalities ...')
            
              const personalities_res = this.personalities.filter((data) => {
        
                data.type = this.RESULT_TYPES.POPULAR_PERSONALITY;
               
                return (
                  data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||  data.content.toLowerCase().indexOf(query.toLowerCase()) !== -1 
                );
              });
  
              if(personalities_res.length > 0 ){
                // this.results = personalities_res;
                this.results = this.results.concat(personalities_res)
                
              }else{
                console.log('should search more personalities ...')

                const mabalacat_details_res = this.mabalacat_details.filter((data,i) => {
        
                  data.type = this.RESULT_TYPES.MABALACAT_DETAIL;
                
                 
                  if(!Array.isArray(data)){
                    data.title = i == 1 ? 'Mabalacat City History' :'Mabalacat City Fiesta'
                    data.tab = i == 1 ? 'History' :'Fiesta'
                    return (
                      data.content.toLowerCase().indexOf(query.toLowerCase()) !== -1 || data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 
                    );
                  }
                });

                if(mabalacat_details_res.length > 0 ){
                  // this.results = mabalacat_details_res;
                  this.results = this.results.concat(mabalacat_details_res)
                } 

               
              
              }
            
          
            }
          }
        }
      }

     
     }
    

      
       

      // const barangay_captain_results = this.data.map(
      //   (data) => {
      //     const politician = data.politicians.find(f => {
      //       return f.name.toLowerCase().includes(query.toLowerCase())
      //     })
      //     data.foundInfo = politician;
      //     data.type = this.RESULT_TYPES.BARANGAY_CAPTAIN;
      //     return   data;

      //   }
      // );

      // console.log("barangay captain results", barangay_captain_results)

      // this.results  = barangay_captain_results.length > 0? this.results.concat(barangay_captain_results) : this.results;

      this.tempResults = this.results;

      console.log('res1', this.results);

      if (this.queryFilter) {
        this.filterResults();
      }
      this.warningMsg = this.results.length == 0 ? 'No Results Found.' : '';
      console.log('results', this.results);
    }
  }

  openContent(content) {
    this.closeModal();

    const data = JSON.stringify(content);
    console.log('data', content);
    // this.router.navigate(['/tabs/tab1/content',{content:data}])
    // this.router.navigate(['/barangay-content', { data: data, name: content.name }])
    this.router.navigate(['/barangay', { content: data }]);

  }

  openDetails(politician,type){
    console.log('DETAIL',politician);
    const data = JSON.stringify(politician)
    if(type == 0){
      this.router.navigate(['/barangay-captain', { data: data }])
    }else{
      this.router.navigate(['/municipal-mayor', { data: data }])
    }
    
  }

  openContentMabalacat(content){
    const data = JSON.stringify(content);
    console.log("DATA:",data)

    switch(content.type){
      case this.RESULT_TYPES.MABALACAT_DETAIL:
        this.router.navigate(['/mabalacat-history', { tab: content.tab }]);
        break;
      case this.RESULT_TYPES.MABALACAT_MAYOR:
        this.router.navigate(['/mabalacat-history', { tab: 'Politicians' }]);
        break;
      case this.RESULT_TYPES.POPULAR_PLACE:
          this.router.navigate(['/popular-place', { data: data }])
          break; 
      case this.RESULT_TYPES.POPULAR_PERSONALITY:
        this.router.navigate(['/personalities', { data: data }])
        break; 
      default:
        break;   

        

    }
  }

  resetResults() {
    console.log('reset');
    this.results = [];
    // this.results = this.data;
  }
  async showFilterModal() {
    const modal = await this.modal.create({
      component: FilterPage,
      componentProps: { data: this.queryFilter },
    });

    modal.present();

    modal.onDidDismiss().then((props) => {
      console.log('propss', props);
      if (props.data) {
        this.queryFilter = props.data;
        if (
          this.queryFilter.foundingYear.to ||
          this.queryFilter.foundingYear.from ||
          this.queryFilter.sort ||
          this.queryFilter.population
        ) {
          console.log('props', props);
          this.results = this.data;
          this.queryFilter = props.data;

          this.filterResults();
        } else {
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
      } else {
        this.results = [];
        this.results = this.data;
        this.queryFilter = null;
      }
    });
  }

  filterResults() {
    let filtered = [];
    if (
      this.queryFilter.foundingYear.to &&
      this.queryFilter.foundingYear.from &&
      !this.queryFilter.population
    ) {
      filtered = this.results.filter((item) => {
        console.log('data:::', this.queryFilter);
        return (
          item.foundingYear &&
          item.foundingYear <= this.queryFilter.foundingYear.to &&
          item.foundingYear >= this.queryFilter.foundingYear.from
        );
      });
    } else if (
      this.queryFilter.foundingYear.to &&
      this.queryFilter.foundingYear.from &&
      this.queryFilter.population
    ) {
      filtered = this.results.filter((item) => {
        console.log('data::: f', this.queryFilter);
        const queryPopulation =
          this.queryFilter.population == 5000
            ? item.population < 5000
            : item.population > 10000;
        return (
          (item.foundingYear <= this.queryFilter.foundingYear.to &&
            item.foundingYear >= this.queryFilter.foundingYear.from) ||
          queryPopulation
        );
      });
    } else if (
      (this.queryFilter.foundingYear.to &&
        this.queryFilter.foundingYear.from) ||
      this.queryFilter.population
    ) {
      filtered = this.results.filter((item) => {
        console.log('data::: either', this.queryFilter);
        const queryPopulation =
          this.queryFilter.population == 5000
            ? item.population < 5000
            : item.population > 10000;
        return (
          (item.foundingYear <= this.queryFilter.foundingYear.to &&
            item.foundingYear >= this.queryFilter.foundingYear.from) ||
          queryPopulation
        );
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
    if (
      this.queryFilter.sort == 'foundingYear-Asc' ||
      this.queryFilter.sort == 'foundingYear-Desc'
    ) {
      filtered.forEach((data) => {
        data.foundInfo = {
          type: 'History',
          content: data.foundingYear
            ? 'Founding Year: ' + data.foundingYear
            : '',
        };
      });
    }
    // // founding
    else if (
      this.queryFilter.sort == 'population-Asc' ||
      this.queryFilter.sort == 'population-Desc'
    ) {
      filtered.forEach((data) => {
        data.foundInfo = {
          type: 'History',
          content: data.population ? 'Population ' + data.population : '',
        };
      });
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

    if (
      filtered.length == 0 &&
      !this.queryFilter.foundingYear.to &&
      !this.queryFilter.foundingYear.from
    ) {
      filtered = this.results;
      if (
        this.queryFilter.sort == 'foundingYear-Desc' ||
        this.queryFilter.sort == 'foundingYear-Asc'
      ) {
        filtered = filtered.filter((i) => {
          return i.foundingYear != '' && i.foundingYear;
        });
        console.log('FILTERED', filtered);
        filtered.forEach((data) => {
          data.foundInfo = {
            type: 'History',
            content: data.foundingYear
              ? 'Founding Year: ' + data.foundingYear
              : '',
          };
        });
      } else if (
        this.queryFilter.sort == 'population-Desc' ||
        this.queryFilter.sort == 'population-Asc'
      ) {
        filtered = filtered.filter((i) => {
          return i.population != '' && i.population;
        });
        console.log('FILTERED POP', filtered);
        filtered.forEach((data) => {
          data.foundInfo = {
            type: 'History',
            content: data.population ? 'Population ' + data.population : '',
          };
        });
      }
    }
    let sorted = [];
    if (this.queryFilter.sort == 'foundingYear-Asc') {
      sorted = filtered.sort((a, b) => {
        // return a.foundingYear - b.foundingYear;
        return a.foundingYear && b.foundingYear
          ? a.foundingYear - b.foundingYear
          : 0;
      });
    } else if (this.queryFilter.sort == 'foundingYear-Desc') {
      sorted = filtered.sort((a, b) => {
        return b.foundingYear - a.foundingYear;
      });
    } else if (this.queryFilter.sort == 'population-Desc') {
      sorted = filtered.sort((a, b) => {
        return b.population - a.population;
      });
    } else if (this.queryFilter.sort == 'population-Asc') {
      sorted = filtered.sort((a, b) => {
        return a.population - b.population;
      });
    } else {
      sorted = filtered.sort((a, b) => {
        return a.name - b.name;
      });
    }
    this.results = sorted;
    this.warningMsg = this.results.length == 0 ? 'No Results Found.' : '';
    console.log('sorted', this.results);
  }
}
