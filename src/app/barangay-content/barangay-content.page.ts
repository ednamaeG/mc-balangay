import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barangay-content',
  templateUrl: './barangay-content.page.html',
  styleUrls: ['./barangay-content.page.scss'],
})
export class BarangayContentPage implements OnInit {
  details:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.details =  JSON.parse(this.route.snapshot.params.data);
    console.log('details',this.details)
  }

}
