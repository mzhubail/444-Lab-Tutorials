import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NumberValidator } from '../custom-validators';
import { AlertController, IonModal } from '@ionic/angular';
import { FormComponent } from '../components/input-components';
import { Activity } from '../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(FormComponent) addActivityComponent!: FormComponent;

  addActivityForm;
  addProps = {
    topic: undefined,
    date: undefined,
    duration: undefined,
  };

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.addActivityForm = this.buildForm('', '', '');
  }

  ngOnInit() { }

  buildForm(
    title: string,
    venue: string,
    partCount: string,
  ) {
    return this.formBuilder.group({
      title: [title, [Validators.required, Validators.maxLength(64), Validators.minLength(8),]],
      venue: [venue, [Validators.required, Validators.maxLength(64), Validators.minLength(4),]],
      partCount: [partCount, [Validators.required, NumberValidator.number, Validators.max(999),]],
    });
  }

  /* Modal related */
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const props = this.addProps;
    this.addActivityComponent.submitForm();
    console.log(this.addProps);

    // Validation
    if (!this.addActivityForm.valid)
      return;
    if (props.date === undefined)
      return this.validationAlert('Please select a date');
    if (props.duration === undefined)
      return this.validationAlert('Please select a duration');
    if (props.topic === undefined)
      return this.validationAlert('Please select a topic');

    // Add activity
    const _activity = {
      ...props,
      ...this.addActivityForm.value,
    };
    const activity = (_activity as unknown) as Activity;
    console.log(activity);
    // this.membersService.addMember(member);

    this.modal.dismiss(null, 'confirm');
    return;
  }

  async validationAlert(message: string) {
    var alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Close'],
    });
    alert.present();
  }
}
