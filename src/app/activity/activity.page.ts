import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NumberValidator } from '../custom-validators';
import { AlertController, IonModal } from '@ionic/angular';
import { FormComponent } from '../components/input-components';
import { Activity, ActivityService } from '../services/activity.service';

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
  activities: Activity[] | undefined;

  // Edit functionality
  editIndex = -1;
  editProps: Props = {
    topic: undefined,
    date: undefined,
    duration: undefined,
  };
  editForm;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public activityService: ActivityService,
  ) {
    activityService.activities$.subscribe(data => {
      this.activities = data;
    });
    this.addActivityForm = this.buildForm('', '', '');
    this.editForm = this.buildForm('', '', '');
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
    // Trim date part from duration and pad with zeros
    const
      _duration = new Date((props.duration as unknown) as string),
      duration = _duration.getHours().toString().padStart(2, '0') + ':' +
          _duration.getMinutes().toString().padStart(2, '0');

    const fromForm = this.addActivityForm.value;
    const _activity = {
      ...props,
      // Convert part count to number
      title: fromForm.title,
      venue: fromForm.venue,
      partCount: Number(fromForm.partCount),
      duration: duration,
    };
    const activity = (_activity as unknown) as Activity;
    console.log(activity);
    this.activityService.addActivity(activity);
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

  formatDate(ISOString: string) {
    const date = new Date(ISOString);
    return date.toDateString();
  }


  // Edit functionality
  toggleEditable(index: number, id: string | undefined) {
    if (this.editIndex == index) {
      if (this.editForm.invalid)
        return;

      this.editIndex = -1;
      if (this.activities === undefined || id === undefined)
        return;


      // Extract activity and store it
      const props = this.editProps;
      // Trim date part from duration and pad with zeros
      const
        _duration = new Date((props.duration as unknown) as string),
        duration = _duration.getHours().toString().padStart(2, '0') + ':' +
            _duration.getMinutes().toString().padStart(2, '0');

      const fromForm = this.editForm.value;
      const _activity = {
        ...props,
        // Convert part count to number
        title: fromForm.title,
        venue: fromForm.venue,
        partCount: Number(fromForm.partCount),
        duration: duration,
      };
      const activity = (_activity as unknown) as Activity;

      console.log('Saving', activity);
      this.activityService.setActivity(id, activity);
    }

    else {
      this.editIndex = index;
      if (!this.activities)
        return;
      const member = this.activities[index];
      this.editForm = this.buildForm(
        member.title,
        member.venue,
        member.partCount.toString(),
      );
      this.editProps = {
        topic: member.topic,
        date: member.date,
        duration: member.duration,
      };
    }
  }

  _delete(id: string | undefined) {
    if (id)
      this.activityService.deleteActivity(id);
  }
}

interface Props {
  topic: undefined | string,
  date: undefined | string,
  duration: undefined | string,
}
