import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import OlMap from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import { MapService } from './map.service';
import { MapidService } from './mapid.service';

@Component({
  selector: 'app-map',
  template: '',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../../node_modules/ol/ol.css',
    '../../../node_modules/ol-ext/dist/ol-ext.css'
  ],
  providers: [MapidService]
})

export class MapComponent implements OnInit {

  @Input() id: string;

  @Input() lon: string;

  @Input() lat: string;

  @Input() zoom: string;

  @Input() wrapDateLine = false;

  map: OlMap;

  constructor(
    private mapService: MapService,
    private mapidService: MapidService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.mapidService.setId(this.id);
    this.map = this.mapService.getMap(this.id);
    if (!this.id) {
      this.id = 'map';
      this.map.setTarget(this.elementRef.nativeElement);
    }
    this.map.getView().setCenter(fromLonLat([parseFloat(this.lon) || 0, parseFloat(this.lat) || 0]));
    this.map.getView().setZoom(this.zoom);

  }
}
