import { Injectable } from '@angular/core';
import {Fill, Stroke, Style, Text} from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  colorScaleCold = {
    1: '#f7fbff',
    2: '#deebf7',
    3: '#c6dbef',
    4: '#9ecae1',
    5: '#6baed6',
    6: '#4292c6',
    7: '#2171b5',
    8: '#08519c',
    9: '#08306b'
  };

  colorScaleWarm = {
    1: '#ffffcc',
    2: '#ffeda0',
    3: '#fed976',
    4: '#feb24c',
    5: '#fd8d3c',
    6: '#fc4e2a',
    7: '#e31a1c',
    8: '#bd0026',
    9: '#800026'
  };

  colorScaleNature = {
    1: '#ffffe5',
    2: '#f7fcb9',
    3: '#d9f0a3',
    4: '#addd8e',
    5: '#78c679',
    6: '#41ab5d',
    7: '#238443',
    8: '#006837',
    9: '#004529'
  };

  colorScalePurple = {
    1: '#f7fcfd',
    2: '#e0ecf4',
    3: '#bfd3e6',
    4: '#9ebcda',
    5: '#8c96c6',
    6: '#8c6bb1',
    7: '#88419d',
    8: '#810f7c',
    9: '#4d004b'
  };

  scaleMap = {purple: this.colorScalePurple, cold: this.colorScaleCold, warm: this.colorScaleWarm, nature: this.colorScaleNature }

  private highlightfill = new Fill({
    color: 'rgba(201, 148, 199,0.3)'
  });
  private highlightStrok = new Stroke({
    color : 'rgba(201, 148, 199,0.3)',
    width : 4
  });
  highlightStyle = new Style({
    fill: this.highlightfill,
    stroke : this.highlightStrok
  });
  private pickedfill = new Fill({
    color: 'rgba(255, 0, 0,0.3)'
  });
  private pickedStrok = new Stroke({
    color : 'rgba(255, 0, 0,0.3)',
    width : 1
  });
  chosenStyle = new Style({
    stroke : this.pickedStrok,
    fill : this.pickedfill
  });

  private greyedFill = new Fill({
    color: 'rgba(136,136,136,0.3)'
  });
  private greyedStroke = new Stroke({
    color : 'rgba(136,136,136,0.3)',
    width : 1
  });
  greyedStyle = new Style({
    stroke : this.greyedStroke,
    fill : this.greyedFill
  });

  constructor() { }

  getStyleForClassAndScale(scale, num){
    scale = this.scaleMap[scale];
    const fill = new Fill({
      color: scale[num]
    });
    const stroke = new Stroke({
      color : scale[num],
      width : 1
    });
    return new Style({
      stroke,
      fill
    });
  }

}
