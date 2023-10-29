import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  COLOR_STORAGE = 'color';
  private _barColor = '';


  get barColor() : string {
    return this._barColor
  }
  set barColor(color: string) {
    this._barColor = color
    Preferences.set({
      key: this.COLOR_STORAGE,
      value: this._barColor,
    });
  }

  constructor() {
    this.loadSavedColor()
  }

  async loadSavedColor() {
    const { value } = await Preferences.get({ key: this.COLOR_STORAGE });
    this._barColor = value ? value : '';
  }
}
