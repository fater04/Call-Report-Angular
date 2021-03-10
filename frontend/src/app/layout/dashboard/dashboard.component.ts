import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'bar-chart';
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['MARS', 'FEVRIER', 'JANVIER', 'DECEMBRE', 'NOVEMBRE'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins: any = {backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED'
    ]};
  public barChartColors: Color[] = [
    { backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB'
      ] },
  ];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46], label: 'Calls' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
