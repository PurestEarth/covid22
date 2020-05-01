import { Component, OnInit, Input, Output, Host, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { DataHolderService } from '../_services/data-holder.service';
import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Country from 'src/app/_models/Country';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Style } from 'ol/style';
import { StyleService } from '../_services/style-service.service';

@Component({
  selector: 'app-reactive-layer',
  template: ''
})
export class ReactiveLayerComponent implements OnInit, AfterViewChecked {

  @Input() layer;
  @Input() name;
  @Input() opacity = 1;
  @Input() visibility = true;
  @Input() data = [];
  globalData: Country[];
  globalMap: { [name: string]: Country} = {};
  layerHolder: VectorLayer;
  featureList = new BehaviorSubject([]);
  @Output() countryId = new EventEmitter<string>();

  currFocus: [string, Style] = [undefined, undefined];
  currChosen: [string, Style] = [undefined, undefined];

  constructor(
    private styleService: StyleService,
    private dataHolder: DataHolderService,
    private mapService: MapService,
    @Host() private mapidService: MapidService) {
    if (this.globalData && this.globalData.length !== 0){
      this.displayGlobalData();
    }
    else if (Object.keys(dataHolder).length !== 1){
      this.displayGlobalData();
    }
  }
  ngAfterViewChecked(): void {
    if (this.featureList.value.length === 0){
      this.featureList.next(this.layerHolder.getSource().getFeatures());
    }
  }

  @Input() set passGlobalData(value: string) {
    if (value && value.length !== 0 ){
      this.globalData = JSON.parse(value);
      this.displayGlobalData();
    }
 }

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
        this.layerHolder = layer;
        map.on('pointermove', evt => {
          if (evt.dragging) {
            return;
          }
          const pixel = map.getEventPixel(evt.originalEvent);
          this.focusOnCountry(pixel, map, layer);
        });
        map.on('click', evt => {
          if (evt.dragging) {
            return;
          }
          this.requestInfoForCountry(evt.pixel, map, layer);
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
      if ((!(feature.getId() === this.currFocus[0])) && (feature.getId() !== this.currChosen[0])){
        console.log(feature.getId() + ': ' + feature.get('name'));
        const oldStyle = layer.getSource().getFeatureById(feature.getId()).getStyle();
        layer.getSource().getFeatureById(feature.getId()).setStyle(this.styleService.highlightStyle);
        if (this.currFocus[0] !== undefined) {
          layer.getSource().getFeatureById(this.currFocus[0]).setStyle(this.currFocus[1]);
        }
        this.currFocus = [feature.getId(), oldStyle];
      }
    }
  }

  requestInfoForCountry(pixel, map, layer) {
    const feature = map.forEachFeatureAtPixel(pixel, feature => {
      return feature;
    });
    if (feature) {
      if (!(feature.getId() === this.currChosen[0])){
        // todo remember to unsubscribe if retarded user will click something else
        const oldStyle = this.currFocus[1];
        layer.getSource().getFeatureById(feature.getId()).setStyle(this.styleService.chosenStyle);
        this.currFocus = [undefined, undefined];
        this.countryId.emit(feature.getId());
        if (this.currChosen[0] !== undefined) {
          layer.getSource().getFeatureById(this.currChosen[0]).setStyle(this.currChosen[1]);
        }
        this.currChosen = [feature.getId(), oldStyle];
      }
    }
  }

  displayGlobalData(){
    console.log('DISPLAYIN GLOBAL DATA');
    this.globalData.forEach( (elem: Country) => {
      this.globalMap[elem.country] = elem;
    });
    this.dataHolder.globalMap = this.globalMap;
    this.featureList.pipe(filter((features) => features.length !== 0)).subscribe( res => {
      res.forEach(element => {
        let currCountry = this.globalMap[element.get('name')];
        if (currCountry){
          if (currCountry.infectedClass){
            element.setStyle(this.styleService.getStyleForClassAndScale('warm', currCountry.infectedClass));
          }
          else{
            element.setStyle(this.styleService.greyedStyle);
          }
        }
        else{
          element.setStyle(this.styleService.greyedStyle);
        }
        // todo grey
        // todo usa xD
        // todo skala barw  // assign class to every record
      });
    });
  }
}
