import { Injectable } from '@angular/core';

@Injectable()
export class MapidService {

  private id: string;

  constructor() { }

  getId(): string {
    return this.id;
  }

  setId(id: string= null) {
    this.id = id;
  }

}
