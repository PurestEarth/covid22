import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldComponentComponent } from './world-component/world-component.component';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent,
    WorldComponentComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
