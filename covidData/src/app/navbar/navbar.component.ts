import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() displayStat = new EventEmitter<string>();
  defStat = 'Infected';
  stats = ['Infected', 'Deceased', 'Recovered'];

  constructor() { }

  ngOnInit(): void {
  }

  emitStat(stat: string): void {
    this.displayStat.emit(stat);
  }

}
