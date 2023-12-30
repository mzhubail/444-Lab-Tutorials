import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AlertController, Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  list1 = ['H', 'O', 'M', 'E'];
  list2: string[] = [];

  @ViewChild('zone1') zone1!: ElementRef;
  @ViewChild('zone2') zone2!: ElementRef;

  @ViewChildren('item', { read: ElementRef })
  items!: QueryList<ElementRef>;

  gesturearray: Array<Gesture> = [];

  constructor(
    private gestureCtrl: GestureController,
    private changeDetectorRef: ChangeDetectorRef,
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.updateGestures();
  }

  updateGestures() {
    this.gesturearray.map((gesture) => gesture.destroy());
    this.gesturearray = [];

    const arr = this.items.toArray();
    for (let item of arr) {
      const drag = this.gestureCtrl.create({
        el: item.nativeElement,
        threshold: 1,
        gestureName: 'drag',
        onStart: (ev) => {
          item.nativeElement.style.transition = '';
          item.nativeElement.style.opacity = '0.8';
          item.nativeElement.style.fontWeight = 'bold';
          this.changeDetectorRef.detectChanges();
        },
        onMove: (ev) => {
          item.nativeElement.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px)`;
          item.nativeElement.style.zIndex = 100;
          this.checkDropZoneHover(ev.currentX, ev.currentY);
        },
        onEnd: (ev) => {
          this.handleDrop(item, ev.currentX, ev.currentY);
        },
      });

      drag.enable();
      this.gesturearray.push(drag);
    }
    // this.items.changes.subscribe(this.updateGestures);
  }

  handleDrop(item: any, endX: number, endY: number) {
    const drop1 = this.zone1.nativeElement.getBoundingClientRect();
    const drop2 = this.zone2.nativeElement.getBoundingClientRect();
    const value = item.nativeElement.id;
    if (this.isInZone(endX, endY, drop2)) {
      console.log('Entered 2 with value', value);
      if (this.list1.indexOf(value) != -1) {
        this.list1.splice(this.list1.indexOf(value), 1);
      }
      if (this.list2.indexOf(value) != -1) {
        this.list2.splice(this.list2.indexOf(value), 1);
      }
      this.list2.push(value);
    }
    item.nativeElement.style.transition = '.2s ease-out';
    item.nativeElement.style.zIndex = 'inherit';
    item.nativeElement.style.transform = `translate(0,0)`;
    item.nativeElement.style.opacity = '1';
    item.nativeElement.style.fontWeight = 'normal';

    this.zone1.nativeElement.style.borderColor = 'var(--color)';
    this.zone2.nativeElement.style.borderColor = 'var(--color)';
    this.changeDetectorRef.detectChanges();
    this.updateGestures();
  }

  checkDropZoneHover(x: number, y: number) {
    const drop1 = this.zone1.nativeElement.getBoundingClientRect();
    const drop2 = this.zone2.nativeElement.getBoundingClientRect();
    if (this.isInZone(x, y, drop1)) {
      this.zone1.nativeElement.style.borderColor = '#009fff';
    } else if (this.isInZone(x, y, drop2)) {
      this.zone2.nativeElement.style.borderColor = '#009fff';
    } else {
      this.zone1.nativeElement.style.borderColor = 'var(--color)';
      this.zone2.nativeElement.style.borderColor = 'var(--color)';
    }
  }

  isInZone(x: number, y: number, dropzone: any) {
    if (x < dropzone.left || x >= dropzone.right) {
      return false;
    }
    if (y < dropzone.top || y >= dropzone.bottom) {
      return false;
    }
    return true;
  }

  verifySolution() {
    const word = this.list2.reduce((prev, curr) => prev + curr);

    let h, m;
    if (word === 'HOME') {
      h = 'Congrats';
      m = 'Your solution was correct';
    } else {
      h = 'You failed';
      m = 'Your solution was not correct';
    }

    this.alertController
      .create({
        header: h,
        message: m,
        buttons: ['OK'],
      })
      .then((a) => a.present());
  }
}
