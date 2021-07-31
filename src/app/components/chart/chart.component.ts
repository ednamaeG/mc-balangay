import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IBarangay, IStats } from 'src/app/interfaces/barangay';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'statistics-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas;
  pieChart: any;
  @Input() barangayData: IBarangay;
  constructor() { }

  ngOnInit() {
    console.log('stats', this.barangayData)
    this.createChart()
  }

  createChart() {
    const data = this.barangayData.statistics.data.map(data => {
      return data.value
    })

    const labels = this.barangayData.statistics.data.map(data => {
      return data.label
    })

    console.log("DATA", data)
    const chartOptions: any = {
      responsive: true,

      plugins: {

        legend: {
          position: 'bottom',

        },

        labels:{
          render:'label'
        },


        title: {
          display: true,
          text: `${this.barangayData.name.toUpperCase()} POPULATION`,
          position: 'top'
        }
      }
    }
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          label: 'Population As of TEST',
          data: data,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',

          ],
          hoverOffset: 4
        }]
      }, options: chartOptions

    });
  }

}
