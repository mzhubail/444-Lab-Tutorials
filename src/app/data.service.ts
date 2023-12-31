import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  PAPERSIZES = ['A3', 'A4', 'A5', 'B5', 'letter'];
  INKQUALITY = ['low', 'medium', 'high'];

  constructor() {}
}
