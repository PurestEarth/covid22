import { Component, Input, OnInit, Host } from '@angular/core';

import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';

@Component({
  selector: 'app-interaction',
  template: ''
})

export class InteractionComponent implements OnInit {

  constructor(
    private mapService: MapService,
    @Host()
    private mapidService: MapidService
  ) { }

  ngOnInit() {
    const map: OlMap = this.mapService.getMap(this.mapidService);
    const mapId = this.mapidService.getId();
    const map2 = (mapId === 'map1' ? 'map' : 'map1');


  }
}
