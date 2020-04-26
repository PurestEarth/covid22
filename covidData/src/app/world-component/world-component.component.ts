import { Component, OnInit } from '@angular/core';
import { WorldService } from '../_services/world-service.service';
import Country from '../_models/Country';

@Component({
  selector: 'app-world-component',
  templateUrl: './world-component.component.html',
  styleUrls: ['./world-component.component.scss']
})
export class WorldComponentComponent implements OnInit {
  countryList = [];
  constructor(private worldService: WorldService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.worldService.getCountries().subscribe( (res: Country[]) => {
      console.log(res);
      this.countryList = res;
    }, err => console.log(err));
  }
}
