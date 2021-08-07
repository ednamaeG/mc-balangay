import { Component, Input, OnInit } from '@angular/core';
import { IBarangayDetail, IPolitician } from 'src/app/interfaces/barangay';

@Component({
  selector: 'app-politicians-list',
  templateUrl: './politicians-list.component.html',
  styleUrls: ['./politicians-list.component.scss'],
})
export class PoliticiansListComponent implements OnInit {
  // @Input() content: IBarangayDetail;
  @Input() politicians: IPolitician[];
  constructor() { }

  ngOnInit() {
    console.log(this.politicians)
  }

}
