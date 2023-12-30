import { Component } from '@angular/core';
import { FBService } from '../fb.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public form;

  constructor(public serv: FBService, public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      user: [
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
