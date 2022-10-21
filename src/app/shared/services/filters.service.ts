import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }

  /////////////////////////////////////////////////
  /// Gnerate Filter Control Names
  generateRandomKeys(type) {
    return `${type}${this.generateRandomInt(100)}`
  }

  generateRandomInt(to) {
    return Math.floor(Math.random() * to)
  }
}
