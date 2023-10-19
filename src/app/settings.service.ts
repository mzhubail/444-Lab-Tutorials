import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  COLOR_STORAGE = 'color';
  barColor = '';

  constructor() {
    this.loadSavedColor()
  }

  async loadSavedColor() {
    const { value } = await Preferences.get({ key: this.COLOR_STORAGE });
    this.barColor = value ? value : '';
  }

  updateBarColor = () =>
    Preferences.set({
      key: this.COLOR_STORAGE,
      value: this.barColor,
    });
}
