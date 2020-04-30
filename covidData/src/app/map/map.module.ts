import { NgModule } from '@angular/core';

import { MapService } from './map.service';

import { MapComponent } from './map.component';
import { LayerComponent } from './layer/layer.component';
import { ControlComponent } from './control/control.component';
import { MousePositionComponent } from './control/mouse-position.component';
import { InteractionComponent } from './interaction/interaction.component';
import { ReactiveLayerComponent } from './reactive-layer/reactive-layer.component';

@NgModule({
  declarations: [
    MapComponent,
    LayerComponent,
    ControlComponent,
    MousePositionComponent,
    InteractionComponent,
    ReactiveLayerComponent
  ],
  imports: [],
  providers: [
    MapService
  ],
  exports: [
    MapComponent,
    LayerComponent,
    ReactiveLayerComponent,
    ControlComponent,
    MousePositionComponent,
    InteractionComponent
 ]
})
export class MapModule { }
