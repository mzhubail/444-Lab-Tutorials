import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Device, FbService } from '../fb.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public form;
  public props: Partial<Device> = {
    weight: 'light',
  };
  public year: string = '';

  constructor(
    formBuilder: FormBuilder,
    public fbService: FbService,
    public alertController: AlertController,
  ) {
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

  addDevice() {
    const serial = this.props.serial,
      weight = this.props.weight,
      model = this.form.value.model;
    if (!serial || !weight || !model) return;

    const year = new Date(this.year);
    this.fbService
      .addDevice({
        model: model,
        serial: serial,
        weight: weight,
        year: year,
      })
      .then(() => {
        this.alertController
          .create({
            header: 'Device added successfully',
            buttons: ['OK'],
          })
          .then((a) => a.present());
      })
      .catch(() => {
        this.alertController
          .create({
            header: 'Error',
            message: 'Sorry.  We faced a problem adding your device.' +
              'please try again later.',
            buttons: ['Cancel'],
          })
          .then((a) => a.present());
      });
  }
}
