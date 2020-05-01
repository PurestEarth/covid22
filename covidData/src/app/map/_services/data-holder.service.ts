import { Injectable } from '@angular/core';
import Country from 'src/app/_models/Country';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {

  globalMap: { [name: string]: Country} = {};

  constructor() { }
}
