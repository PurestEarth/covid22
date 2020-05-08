import { NgModule } from '@angular/core';

import { MapService } from './map.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MapComponent } from './map.component';
import { LayerComponent } from './layer/layer.component';
import { ControlComponent } from './control/control.component';
import { MousePositionComponent } from './control/mouse-position.component';
import { InteractionComponent } from './interaction/interaction.component';
import { ReactiveLayerComponent } from './reactive-layer/reactive-layer.component';
import { CountryAboutComponent } from './country/country-about/country-about.component';
import { HistoricalDataComponent } from './country/historical-data/historical-data.component';

@NgModule({
  declarations: [
    MapComponent,
    CountryAboutComponent,
    LayerComponent,
    HistoricalDataComponent,
    ControlComponent,
    MousePositionComponent,
    InteractionComponent,
    ReactiveLayerComponent
  ],
  imports: [
    MatDialogModule
  ],
  providers: [
    CountryAboutComponent,
    MapService
  ],
  exports: [
    MapComponent,
    CountryAboutComponent,
    LayerComponent,
    ReactiveLayerComponent,
    HistoricalDataComponent,
    ControlComponent,
    MousePositionComponent,
    InteractionComponent
 ]
})
export class MapModule { }
