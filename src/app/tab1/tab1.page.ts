import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Device } from '../fb.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public form;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      model: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-z0-9]*$/i),
        ],
      ],
    });
  }
}
