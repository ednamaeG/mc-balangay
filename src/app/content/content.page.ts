import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  data: any= {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.data = JSON.parse(params.content);
    console.log('content', this.data);
  }
}
