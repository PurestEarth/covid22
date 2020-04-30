import { Component, Input, OnInit, Host } from '@angular/core';

import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import OlTileLayer from 'ol/layer/Tile';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style, Text} from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

@Component({
  selector: 'app-layer',
  template: ''
})

export class LayerComponent implements OnInit {
  @Input() layer;
  @Input() name;
  @Input() opacity = 1;
  @Input() visibility = true;
  style = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    }),
    text: new Text({
      font: '12px Calibri,sans-serif',
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
fill = new Fill({
  color: 'rgba(255,0,0,1.0)'
});
strok = new Stroke({
  color : 'rgba(255,0,0,1.0)',
  width : 1
});
stajl = new Style({
  stroke : this.strok,
  fill : this.fill
});

  constructor(
    private mapService: MapService,
    @Host()
    private mapidService: MapidService
  ) { }

  ngOnInit() {
    const map: OlMap = this.mapService.getMap(this.mapidService);
    const name = this.layer;
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
      }//
      case 'countries': {
        layer =  new VectorLayer({
          source: new VectorSource({
            url: 'https://openlayers.org/en/v5.1.3/examples/data/geojson/countries.geojson',
            format: new GeoJSON()
          }),
        });
        const featureOverlay = new VectorLayer({
          source: new VectorSource(),
          map,
          style(feature) {
            this.highlightStyle.getText().setText(feature.get('name'));
            return this.highlightStyle;
          }
        });

        layer.set('name', this.name || this.layer);
        layer.setOpacity(this.opacity);
        layer.setVisible(this.visibility);
        map.addLayer(layer);
        map.addLayer(featureOverlay);
        map.on('pointermove', evt => {
          if (evt.dragging) {
            return;
          }
          let pixel = map.getEventPixel(evt.originalEvent);
          this.displayFeatureInfo(pixel, map, layer);
        });

        map.on('click', function(evt) {
          this.displayFeatureInfo(evt.pixel, map, layer);
        });
        break;
      }
      case 'USA': {
        layer = new TileLayer({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: {LAYERS: 'topp:states'},
            serverType: 'geoserver',
            transition: 0
          })
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
    if(name !== 'countries'){
      layer.set('name', this.name || this.layer);
      layer.setOpacity(this.opacity);
      layer.setVisible(this.visibility);
      map.addLayer(layer);
    }
  }

  displayFeatureInfo(pixel, map, layer) {
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
      return feature;
    });
    if (feature) {
      console.log(feature.getId() + ': ' + feature.get('name'));
      let actualFeature = layer.getSource().getFeatureById(feature.getId());
      console.log(actualFeature);
      actualFeature.setStyle(this.stajl);
    }
  }



}
