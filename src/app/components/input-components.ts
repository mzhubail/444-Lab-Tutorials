import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { WasSubmittedService } from '../services/was-submitted.service';

@Component({
  selector: 'x-input',
  template: `
    <ion-item>
      <ion-input
          [label]="label"
          labelPlacement="stacked"
          [errorText]="errorMessages()"
          [class.ion-invalid]="this.fc.invalid"
          [class.ion-touched]="this.fc.dirty || this.wasSubmitted"
          [formControl]="fc"
          [placeholder]="placeholder"
          [type]="type"
          ></ion-input>
    </ion-item>
  `,
})
export class InputComponent implements OnInit {
  /** The label of the input */
  @Input({ required: true }) label!: string;
  /**
   * The name of the input used in the error message.  By default has the same
   * value as the label (see ngOnInit)
   */
  @Input() name = 'defaultName';
  @Input({ required: true }) fc!: FormControl;
  /** User defined messages, key is errorName and value is the message */
  @Input() messages: { [key: string]: string } = {};
  @Input() placeholder: string | undefined;
  @Input() type: "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week" = 'text';

  get wasSubmitted() {
    return this.wasSubmittedService.wasSubmitted;
  }

  constructor(
    public wasSubmittedService: WasSubmittedService,
  ) { }


  ngOnInit() {
    if (this.name == 'defaultName')
      this.name = this.label;
  }


  /** Converts angular provided validation errors to error message */
  private convertErrorsToMessage(name: string, errors: ValidationErrors | null): string | undefined {
    // console.log({name, errors: errors})
    if (errors == null)
      return;
    var entries = Object.entries(errors);
    if (entries.length == 0)
      return;
    var [errorName, errorContent] = entries[0];
    // console.log(errorName, errorContent);


    // Check if errorName is in user-defined messages
    if (errorName in this.messages)
      return this.messages[errorName];


    switch (errorName) {
      case 'required':
        return `${name} is required`;
      case 'notANumber':
        return `${name} must be a number`;
      case 'min':
        return `${name} has to be greater than or equal to ${errorContent.min}`;
      case 'max':
        return `${name} has to be less than or equal to ${errorContent.max}`;
      case 'minlength':
        return `${name} has to be at least ${errorContent.requiredLength} characters`;
      case 'maxlength':
        return `${name} has to be at least ${errorContent.requiredLength} characters`;
      case 'email':
        return (name.toLowerCase() != 'email')
          ? `${name} is not a valid email`
          : `${name} is not valid`;
      case 'pattern':
        return `${name} is not valid`;

      default:
        console.warn(`The error '${errorName}' was not catched`, errorContent);
        return `${name} is not valid`;
    }
  }


  /** Wrapper to convert angular provided error to error message */
  public errorMessages() : string | undefined {
    return this.convertErrorsToMessage(this.name, this.fc.errors);
    // if (this.invalidCondition())
    //   return this.convertErrorsToMessage(this.name, this.fc.errors);
    // return;
  }


  // /** Specifies when to display error message */
  // public invalidCondition = () =>
  //   this.fc.invalid && (this.fc.dirty || this.wasSubmitted);

  // /** Specifies when to provide positive feedback to the user */
  // public validCondition = () =>
  //   // this.fc.valid && (this.fc.dirty || this.wasSubmitted);
  //   this.fc.valid && this.wasSubmitted;
}



/**
 * This component is responsible for storing the wasSubmitted value of the form,
 * and provides that as a service for the inputs inside it
 */
@Component({
  selector: 'x-form',
  template: `
    <form (ngSubmit)="submitForm()">
      <ng-content></ng-content>
    </form>
  `,
  providers: [WasSubmittedService],
})
export class FormComponent {
  @Output() onSubmit = new EventEmitter()

  constructor(
    public wasSubmittedService: WasSubmittedService,
  ) { }

  submitForm() {
    this.wasSubmittedService.wasSubmitted = true;
    this.onSubmit.emit();
  }
}
