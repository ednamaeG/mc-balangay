import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-politicians',
  templateUrl: './politicians.page.html',
  styleUrls: ['./politicians.page.scss'],
})
export class PoliticiansPage implements OnInit {
  details: any;
  barangayName: string;
  constructor(private route: ActivatedRoute) {
    this.details = JSON.parse(this.route.snapshot.params.data);
    this.barangayName = this.route.snapshot.params.name;
    console.log('details::', this.details, this.barangayName);
  }

  ngOnInit() {
  }

}
