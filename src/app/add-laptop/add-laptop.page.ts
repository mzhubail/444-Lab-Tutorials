import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Laptop, LaptopsService } from '../services/laptops.service';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-laptop',
  templateUrl: './add-laptop.page.html',
  styleUrls: ['./add-laptop.page.scss'],
})
export class AddLaptopPage implements OnInit {

  CPU_OPTIONS = ['Intel i7', 'Intel i5', 'Intel i3', 'AMD',];
  GPU_OPTIONS = ['Apple M2 Pro', 'intel Iris', 'AMD Radeon', 'NVidia GeForce'];
  SCREEN_OPTIONS = [12, 13, 14, 15];
  segment = 'new';

  mDate = new Date().toISOString();
  initialDate = this.mDate;

  laptopForm;


  async ngOnInit() {
  }

  constructor(
    private alertController: AlertController,
    public laptopsService: LaptopsService,
    public formBuilder: FormBuilder,
  ) {
    this.laptopForm = this.formBuilder.group({
      brand: ['', [Validators.required, Validators.minLength(3)]],
      cpu: ['', Validators.required],
      gpu: ['', Validators.required],
      ram: [0, Validators.required],
      screen: [this.SCREEN_OPTIONS[0], Validators.required],
      weight: [0, Validators.required],
      os: [true, Validators.required],
      storage: [true, Validators.required],
      manuDate: [new Date().toISOString(), Validators.required],
    });
    this.logForm();
  }

  logForm = () => Object.entries(this.laptopForm.controls).forEach(([name, control]) => {
    if (control.errors !== null)
      // console.log({name, errors: control.errors})
      console.log(this.convertErrorsToMessage(name, control.errors));
  });

  setSegment(segment: string) { this.segment = segment; }

  async addLaptop() {
    if (!this.laptopForm.valid)
      return console.warn(this.laptopForm.value);;

    // Create and add laptop
    var l: Laptop = {
      brand: this.laptopForm.controls.brand.value!,
      cpu: this.laptopForm.controls.cpu.value!,
      gpu: this.laptopForm.controls.gpu.value!,
      ram: Number(this.laptopForm.controls.ram.value!),
      screen: Number(this.laptopForm.controls.screen.value!),
      os: this.laptopForm.controls.os.value!,
      weight: Number(this.laptopForm.controls.weight.value!),
      storage: this.laptopForm.controls.storage.value!,
      manuDate: this.laptopForm.controls.manuDate.value!,
      image: '',
    }
    this.laptopsService.addLaptop(l);

    // Success alert
    var alert = await this.alertController.create({
      animated: true,
      buttons: ['close'],
      message: 'Laptop was inserted successfully',
      keyboardClose: true,
    });
    alert.present();
    this.laptopForm.reset();
  }


  /* Helper functions for view */
  accordion_helper = (l: Laptop) => <any>{
    'CPU': l.cpu == '' ? 'NA' : l.cpu,
    'GPU': l.gpu == '' ? 'NA' : l.gpu,
    'RAM': l.ram == 0  ? 'NA' : l.ram,
    'Weight': l.weight == 0 ? 'NA' : l.weight,
    'Screen': l.screen == 0 ? 'NA' : `${l.screen} inches`,
    'Storage': l.storage ? 'HDD' : 'SSD',
    'OS': l.os ? 'Yes' : 'No',
    // 'manuDate': l.manuDate.toDateString ? l.manuDate.toDateString() : l.manuDate.toString(),
    'manuDate': this.formatISODate(
      l.manuDate.toString()
    ),
  };

  capitalize = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  formatISODate = (date : string) => date.substring(0, date.indexOf('T'));


  convertErrorsToMessage(name: string, errors: ValidationErrors) {
    // console.log({name, errors: errors})
    if (errors == null)
      return;
    var entries = Object.entries(errors);
    if (entries.length == 0)
      return;
    var [errorName, errorContent] = entries[0];
    // console.log(errorName, errorContent);
    switch (errorName) {
      case 'required':
        return `${name} is required`;
      case 'minlength':
        return `${name} has to be at least ${errorContent.requiredLength} characters`;

      default:
        console.warn(`${errorName} was not catched`, errorContent);
        return `${name} is not valid`;
    }
  }

}
