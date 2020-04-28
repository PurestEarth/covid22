import { Component, Input, ElementRef, OnInit, Host, Optional } from '@angular/core';

import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import BookmarkCtrl from 'ol-ext/control/GeoBookmark';

@Component({
  selector: 'app-control',
  template: ''
})

export class ControlComponent implements OnInit {


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
    const mark = new BookmarkCtrl({ target: target });
    map.addControl(mark);
  }
}
