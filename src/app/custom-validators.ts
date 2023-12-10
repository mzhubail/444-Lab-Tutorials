import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NumberValidator {
  static number(control: AbstractControl): ValidationErrors | null {
    if (typeof +control.value === "number" && !isNaN(+control.value))
      return null;
    return { notANumber: "The value is not a number"};
  };
}
