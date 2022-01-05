import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBarangayDetail, IPolitician } from 'src/app/interfaces/barangay';

@Component({
  selector: 'app-politicians-list',
  templateUrl: './politicians-list.component.html',
  styleUrls: ['./politicians-list.component.scss'],
})
export class PoliticiansListComponent implements OnInit {
  // @Input() content: IBarangayDetail;
  @Input() politicians: IPolitician[];
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.politicians)
  }

  openDetails(politician){
    console.log('DETAIL',politician);
    const data = JSON.stringify(politician)
    this.router.navigate(['/barangay-captain', { data: data }])
  }

}
