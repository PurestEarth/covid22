import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WorldService } from '../_services/world-service.service';
import Country from '../_models/Country';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style, Text} from 'ol/style';

@Component({
  selector: 'app-world-component',
  templateUrl: './world-component.component.html',
  styleUrls: []
})
export class WorldComponentComponent implements OnInit {
  globalList: string;
  currStat = 'Infected';
  constructor(private worldService: WorldService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.worldService.getCountries().subscribe( (res: Country[]) => {
      this.globalList = JSON.stringify(res);
    });
  }

  getRequestedCountry(message: string) {
    //  todo request
    //  componentToDisplay = message;
  }

  setRequestedStat(message: string) {
    this.currStat = message;
  }

}
