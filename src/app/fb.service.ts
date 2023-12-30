import { Injectable } from '@angular/core';


export interface Device {
  serial: string,
  model: string,
  weight: string,
  year: Date,
};

export interface History {
  serial: string,
  repairDate: Date,
  cost: number,
};


@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor() { }
}
