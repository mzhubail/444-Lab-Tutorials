import { Component } from '@angular/core';
import { FBService, User } from '../fb.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public form;
  public props = {
    quantity: 0,
    approved: false,
    shift: [false, false, false],
  };

  verifyMessage = '';
  verifyColor = '';

  constructor(
    public serv: FBService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-z0-9]*$/i),
        ],
      ],
    });
  }

  /** Modify Quantitiy by a given amount */
  delatQuant(nudge: number) {
    if (this.props.quantity === undefined) return;
    this.props.quantity += nudge;
  }

  updateVerifyMessage() {
    this.verifyMessage = this.form.valid ? 'Pending' : 'Error';
    this.verifyColor = this.form.valid ? '' : 'danger';
  }

  /// Firebase related ///
  submitAnyways() {
    const { approved, quantity, shift } = this.props;
    const { name } = this.form.value;
    const user: User = {
      approved: approved,
      name: name as string,
      quantity: quantity,
      shift: shift,
      status: this.form.valid ? 'Pending' : 'Error',
    };

    this.serv.addUser(user);
  }

  submit() {
    const { approved, quantity, shift } = this.props;
    const { name } = this.form.value;

    if (this.form.invalid) return;

    const user: User = {
      approved: approved,
      name: name as string,
      quantity: quantity,
      shift: shift,
      status: 'Pending',
    };

    this.serv
      .addUser(user)
      .then((x) => {
        this.successAlert(x.id);
      })
      .catch(() => {
        this.failureAlert();
      });
  }

  async successAlert(id: string) {
    const a = await this.alertController.create({
      header: 'Success',
      message: `User was inserted succesffuly.  ${id}`,
      buttons: ['OK'],
    });
    a.present();
  }

  async failureAlert() {
    const a = await this.alertController.create({
      header: 'Error',
      message:
        'We faced some issues while trying to insert your user. ' +
        'Please try again later.',
      buttons: ['OK'],
    });
    a.present();
  }
}
