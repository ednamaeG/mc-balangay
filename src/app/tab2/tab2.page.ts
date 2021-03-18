import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentData;
  testItems = [
    {
      id:1,
      title:"test1",
      isOpen:false
    },
    {
      id:2,
      title:"test2",
      isOpen:false
    },
    {
      id:3,
      title:"test3",
      isOpen:false
    },
    {
      id:4,
      title:"test4",
      isOpen:false
    }
  ];
  currentPage = 1;
  lastPage=0;
  constructor() {
    this.lastPage = this.testItems.length;
    console.log(this.lastPage)
    this.currentData = this.testItems[0]
  }

  setCurrentData(){
    const idx = this.currentPage;
    this.currentData = this.testItems[idx-1];
  }

  nextPage(){
    this.currentPage++;
    this.setCurrentData()
  }

  previousPage(){
    this.currentPage--;
    this.setCurrentData()
  }

}
