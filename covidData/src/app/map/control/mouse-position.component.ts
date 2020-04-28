import { Component, Input, ElementRef, OnInit, Host, Optional } from '@angular/core';

import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import MousePoisition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';


@Component({
  selector: 'app-mouse-position',
  template: ''
})

export class MousePositionComponent implements OnInit {


  @Input() mapId: string;

  constructor(
    private mapService: MapService,
    @Host()
    @Optional()
    private mapidService: MapidService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    const map: OlMap = this.mapService.getMap(this.mapidService || this.mapId);
    const target = this.elementRef.nativeElement.parentElement ? this.elementRef.nativeElement : null;
    const ctrl = new MousePoisition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      undefinedHTML: '&nbsp;',
      target: target
    });
    map.addControl(ctrl);
  }
}
