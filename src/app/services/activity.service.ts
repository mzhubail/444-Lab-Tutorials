import { Injectable } from '@angular/core';

export interface Activity {
  id?: string,
  title: string,
  date: string,
  duration: string,
  venue: string,
  partCount: number,
  topic: string,
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }
}
