import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonContent } from '@ionic/angular';

import { ScrollDetail } from '@ionic/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  selected = 'history'
  slidesOptions = {
    initialSlide: 0,
    // freeMode: true,
    // loop: true,
    autoplay: true
  };
  txt = '';
  showToolbar = false;
  @ViewChild('content') content: IonContent;
  @ViewChild('lineCanvas', { static: true }) lineCanvas;
  pieChart: any;
  vidUrl;
  videoTest = "<iframe  src=https://www.youtube.com/embed/4AtmpOG_yN0 width=100% height='280' frameborder='0' allowfullscreen='allowfullscreen'></iframe>"
  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //  this.content.scrollToTop()
    this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/4AtmpOG_yN0')
  }

  ionViewDidEnter() {
    console.log('tst')
    // this.lineChart =   new Chart(this.lineCanvas.nativeElement, {
    //   type: "pie",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255,99,132,1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },

    // });
    //    this.lineChart =   new Chart(this.lineCanvas.nativeElement, {
    //   type: "pie",
    //   data: {
    //     labels: ["Male", "Female"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [1200, 3000],
    //         backgroundColor: [
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 99, 132, 0.2)",
    //         ],
    //         borderColor: [
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255,99,132,1)",

    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },

    // });
    const chartOptions: any =  {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Total Population'
        }
      }
    }
    this.pieChart = new Chart(this.lineCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: [
          'Male',
          'Female'

        ],
        datasets: [{
          label: 'Population As of TEST',
          data: [1131, 1265],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',

          ],
          hoverOffset: 4
        }]
      }, options:chartOptions



    });

  }
  selectTab(tab) {
    console.log(tab)
    this.selected = tab;
  }
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }
  // async speak() {
  //   await this.tts.speak(this.txt)

  // }
}
