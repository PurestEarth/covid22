import { Component, OnInit, Host, Inject } from '@angular/core';
import { MapidService } from '../../mapid.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Country from 'src/app/_models/Country';
import * as CanvasJS from '../../../../../canvasjs/canvasjs.min';

@Component({
  selector: 'app-country-about',
  templateUrl: './country-about.component.html',
  styleUrls: ['./country-about.component.scss']
})
export class CountryAboutComponent implements OnInit {
  country: Country;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data) {
      this.country = data.country;
      console.log(data.country);
    }

  ngOnInit() {
    const infectedDataPoints = [];
    for ( const elem of this.country.infectedHistory ) {
      infectedDataPoints.push({ y: elem});
    }
    const infectedChart = new CanvasJS.Chart('infectedContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Infected'
      },
      data: [
      {
        type: 'line',
        dataPoints: infectedDataPoints
      }]
    });

    infectedChart.render();

    const deceasedDataPoints = [];
    for ( const elem of this.country.deceasedHistory ) {
      deceasedDataPoints.push({ y: elem});
    }
    const deceasedChart = new CanvasJS.Chart('deceasedContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Deceased'
      },
      data: [
      {
        type: 'line',
        dataPoints: deceasedDataPoints
      }]
    });

    deceasedChart.render();

    const recoveredDataPoints = [];
    for ( const elem of this.country.recoveredHistory ) {
      recoveredDataPoints.push({ y: elem});
    }
    const recoveredChart = new CanvasJS.Chart('recoveredContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Recovered'
      },
      data: [
      {
        type: 'line',
        dataPoints: recoveredDataPoints
      }]
    });

    recoveredChart.render();
    }
}
