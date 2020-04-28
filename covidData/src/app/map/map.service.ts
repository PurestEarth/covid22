import { Injectable } from '@angular/core';

import OlMap from 'ol/Map';
import OlView from 'ol/View';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map = {};

  constructor() { }

  private createMap(id): OlMap {
    const map = new OlMap({
      target: id,
      view: new OlView({
        center: [0, 0],
        zoom: 1,
        projection: 'EPSG:3857'
      })
    });
    return map;
  }

  getMap(id): OlMap {
    id = ((id && id.getId) ? id.getId() : id ) || 'map';
    if (!this.map[id]) {
      this.map[id] = this.createMap(id);
    }
    return this.map[id];
  }

  getMaps() {
    return this.map;
  }

  getArrayMaps() {
    return Object.values(this.map);
  }

}
