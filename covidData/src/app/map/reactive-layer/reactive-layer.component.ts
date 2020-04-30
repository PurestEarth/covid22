import { Component, OnInit, Input, Output, Host } from '@angular/core';
import { DataHolderService } from '../_services/data-holder.service';
import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text} from 'ol/style';

@Component({
  selector: 'app-reactive-layer',
  template: ''
})
export class ReactiveLayerComponent implements OnInit {

  @Input() layer;
  @Input() name;
  @Input() opacity = 1;
  @Input() visibility = true;
  @Input() data = [];
  @Output() countryId;

  fill = new Fill({
    color: 'rgba(255, 191, 0,0.3)'
  });
  strok = new Stroke({
    color : 'rgba(255, 191, 0,0.3)',
    width : 1
  });
  countryStyle = new Style({
    stroke : this.strok,
    fill : this.fill
  });
  currFocus: string;

  constructor(private dataHolder: DataHolderService, private mapService: MapService, @Host() private mapidService: MapidService) { }

  ngOnInit(): void {
    const map: OlMap = this.mapService.getMap(this.mapidService);
    const name = this.layer;
    let layer;
    switch (this.layer) {
      case 'countries': {
        layer =  new VectorLayer({
          source: new VectorSource({
            url: 'https://openlayers.org/en/v5.1.3/examples/data/geojson/countries.geojson',
            format: new GeoJSON()
          }),
        });
        this.addLayer(layer, map);
        map.on('pointermove', evt => {
          if (evt.dragging) {
            return;
          }
          const pixel = map.getEventPixel(evt.originalEvent);
          this.focusOnCountry(pixel, map, layer);
        });
        break;
      }
    }
  }

  addLayer(layer, map: OlMap){
    layer.set('name', this.name || this.layer);
    layer.setOpacity(this.opacity);
    layer.setVisible(this.visibility);
    map.addLayer(layer);
  }

  focusOnCountry(pixel, map, layer) {
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
      return feature;
    });
    if (feature) {
      console.log(this.currFocus);
      if (!(feature.getId() === this.currFocus)){
        console.log(feature.getId() + ': ' + feature.get('name'));
        layer.getSource().getFeatureById(feature.getId()).setStyle(this.countryStyle);
        if (this.currFocus !== undefined) {
          layer.getSource().getFeatureById(this.currFocus).setStyle(null);
        }
        this.currFocus = feature.getId();
      }

    }
  }

}
