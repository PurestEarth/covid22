import { Component, Input, OnInit, Host } from '@angular/core';

import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import OlTileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-layer',
  template: ''
})

export class LayerComponent implements OnInit {
  @Input() layer;
  @Input() name;
  @Input() opacity = 1;
  @Input() visibility = true;


  constructor(
    private mapService: MapService,
    @Host()
    private mapidService: MapidService
  ) { }

  ngOnInit() {
    const map: OlMap = this.mapService.getMap(this.mapidService);
    let layer;
    switch (this.layer) {
      case 'watercolor': {
        layer = new OlTileLayer({
          source: new Stamen({ layer: 'watercolor' })
        });
        break;
      }
      case 'labels': {
        layer = new OlTileLayer({
          source: new Stamen({ layer: 'toner-labels' })
        });
        break;
      }
      case 'OSM':
      default: {
        layer = new OlTileLayer({
          source: new OSM()
        });
      }
    }
    layer.set('name', this.name || this.layer);
    layer.setOpacity(this.opacity);
    layer.setVisible(this.visibility);
    map.addLayer(layer);
  }

}
