
I have modified the contents of the last tutorial to show some of the stuff we
might want to use for our project.

## Custom Components Overview

### Example use of components

<!-- If you look at `components/ -->

Take a look at `brand.page.html`:

```html
<ion-header [translucent]="true">
  <app-toolbar title="Brand"></app-toolbar>
</ion-header>
...
  <div style="display: flex; flex-direction: column; align-items: center;">
    <app-laptop-card *ngFor="let laptop of laptopsService.laptops; let i=index"
        [laptop]="laptop" [id]="i">
    </app-laptop-card>
  </div>
```

You'll notice two things we are using `app-toolbar`, which displays the title of
the app and includes navigation buttons.  The other component `app-laptop-card`
contains the code for displaying the laptop in card (including link to the
details page).

<!-- The good thing about the above code is that it is cleaner; it is easy to see what each part is supposed to be, and if you want to see the details of how  -->

### How to add a component

Note that most of the stuff related to components will be in its own folder
`src/app/components` so that they're separated from the rest of the app.

1. First generate the component using:
    ```sh
    $ ionic generate component components/<component-name>
    ``` 

1. Then add the component to `ComponentsModule`
    ```ts
    var comopnents = [
      ToolbarComponent,
      LaptopCardComponent,
      InputComponent,
      // Add your component here
    ];

    @NgModule({
      declarations: comopnents,
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        SettingsPageRoutingModule,
      ],
      exports: comopnents,
    })
    export class ComponentsModule { }
    ```

1. And in the page where you want to use the components you can import the `ComponentsModule` there.

    ```ts
    // from brand.module.ts

    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BrandPageRoutingModule,
        ComponentsModule,       // Add the components module here so it's imported
      ],
      declarations: [BrandPage]
    })
    export class BrandPageModule {}
    ```


### Benefits of using custom components

For this assignment we where asked to allow the user to control the color of the
toolbar.  However, notice that I'm not injecting the `settingsService` inside
the brand page, instead it is imported inside the `app-toolbar`.  This way the
code is cleaner, and I don't need to import the same service inside each page
manually.


## Input components

Inside `add-laptop` page, notice that I'm using component `x-input` that takes
two inputs: `fc`, short for `FormControl`; and `wasSubmitted`.  The purpose of
this component is that it handles the displaying error messages.

Take a look inside the constructor for the `add-laptop` page.
```ts
constructor(
  ...
) {
  // Create a formGroup with validators
  this.laptopForm = this.formBuilder.group({
    brand: ['', [Validators.required, Validators.minLength(3)]],
    cpu: ['', Validators.required],
    gpu: ['', [Validators.required, Validators.minLength(5)]],
    ram: [0, Validators.required],
    screen: [this.SCREEN_OPTIONS[0], Validators.required],
    weight: [0, Validators.required],
    os: [true, Validators.required],
    storage: [true, Validators.required],
    manuDate: [new Date().toISOString(), Validators.required],
  });
  ...
}
```

Then using `laptopForm.controls.<attribute-name>` we can access the
`FormControl` for each input.
```html
<form class="container" (ngSubmit)="addLaptop()">
  <x-input label="Brand" name="brand" [fc]="laptopForm.controls.brand" [wasSubmitted]="wasSubmitted"></x-input>
  <x-input label="CPU" name="cpu" [fc]="laptopForm.controls.cpu" [wasSubmitted]="wasSubmitted"></x-input>
  <x-input label="GPU" name="gpu" [fc]="laptopForm.controls.gpu" [wasSubmitted]="wasSubmitted"></x-input>
  <input type="submit" class="btn btn-primary" value="Submit">
</form>
```

This should helps us create forms with clean code, without having to handle
error messages manually.

