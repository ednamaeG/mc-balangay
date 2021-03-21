import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  data: any;
  items =
    [
      {
        type: "History",
        content: "Sample Content",
        isOpen:false,
        // thumbnail:"https://blog.udemy.com/wp-content/uploads/2014/05/bigstock-History-56161577.jpg"
      },
      {
        type: "First Family Residence",
        content: "Sample Content",
        isOpen:false

      },
      {
        type: "Fiesta",
        content: "Sample Content",
        isOpen:false,
      }, {
        type: "Branding",
        content: "Sample Content",
        isOpen:false
      }
    ];
 
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.data = JSON.parse(params.content);
    console.log('content', this.data);
  }

  openContent(i){
    this.items[i].isOpen = !this.items[i].isOpen
  }

  viewDetails(detail){
    const data = JSON.stringify(detail);
    this.router.navigate(['/barangay-content',{data:data}])
  }
}
