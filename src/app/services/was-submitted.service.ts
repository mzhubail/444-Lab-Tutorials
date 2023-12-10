import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WasSubmittedService {
  public wasSubmitted : boolean = false;
  constructor() {}
}
