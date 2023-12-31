import { Injectable } from '@angular/core';

export interface PrintingRequest {
  copiesCount: number;
  paperSize: 'A3' | 'A4' | 'A5' | 'B5' | 'letter';
  inkQuality: 'low' | 'medium' | 'hight';
  hasPrintDate: boolean;
  withBorders: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  PAPERSIZES = ['A3', 'A4', 'A5', 'B5', 'letter'];
  INKQUALITY = ['low', 'medium', 'high'];

  constructor() {}
}
