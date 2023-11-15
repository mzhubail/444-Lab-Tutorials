import { Injectable } from '@angular/core';

export interface RanVal {
  Number: number,
  Even: number[],
  Odd: number[],
  Prime: number[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  list : RanVal[] = [];

  constructor() { }
}
