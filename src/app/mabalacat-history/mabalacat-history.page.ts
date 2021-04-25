import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mabalacat-history',
  templateUrl: './mabalacat-history.page.html',
  styleUrls: ['./mabalacat-history.page.scss'],
})
export class MabalacatHistoryPage implements OnInit {
  content:any;
  selectedTab="History";
  constructor(private httpClient:HttpClient) { }

  async ngOnInit() {
    this.content = await  this.getData()
    console.log('content',this.content)
  }

  async getData(): Promise<any> {
    return await this.httpClient.get<any>('./assets/mocks/mabalacat-details.json').toPromise();
  }

  selectTab(tab){
    this.selectedTab = tab;
  }
}
