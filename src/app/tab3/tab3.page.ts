import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Gesture, GestureController, IonItem } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit {
  list1 = ['Ths', 'Th8t', '1lah', 'jfwklblah'];
  list2 = ['Th888is', '341That', 'blah', 'bl9ah'];

  gesturearray: Array<Gesture> = [];

  @ViewChild('zone1') zone1!: ElementRef;
  @ViewChild('zone2') zone2!: ElementRef;

  @ViewChildren('drag', { read: ElementRef })
  items!: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private gestureCtrl: GestureController,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

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
          item.nativeElement.style.zIndex = '1000';
          this.checkDropZoneHover(ev.currentX, ev.currentY, item);
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
    const value = item.nativeElement.innerHTML;
    if (this.isInZone(endX, endY, drop1)) {
      if (this.list1.indexOf(value) != -1) {
        this.list1.splice(this.list1.indexOf(value), 1);
      }
      if (this.list2.indexOf(value) != -1) {
        this.list2.splice(this.list2.indexOf(value), 1);
      }
      this.list1.push(value);
    } else if (this.isInZone(endX, endY, drop2)) {
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
    item.nativeElement.style.backgroundColor = 'transparent';

    this.zone1.nativeElement.style.backgroundColor = 'transparent';
    this.zone2.nativeElement.style.backgroundColor = 'transparent';
    this.changeDetectorRef.detectChanges();
    this.updateGestures();
  }

  checkDropZoneHover(x: number, y: number, item: ElementRef) {
    const drop1 = this.zone1.nativeElement.getBoundingClientRect();
    const drop2 = this.zone2.nativeElement.getBoundingClientRect();
    // if (this.isInZone(x, y, drop1)) {
    //   this.zone1.nativeElement.style.backgroundColor = '#009fff';
    // } else if (this.isInZone(x, y, drop2)) {
    //   this.zone2.nativeElement.style.backgroundColor = '#009fff';
    // } else {
    //   this.zone1.nativeElement.style.backgroundColor = 'transparent';
    //   this.zone2.nativeElement.style.backgroundColor = 'transparent';
    // }
    let curr = item.nativeElement.id;
    if (this.list2.indexOf(curr) !== -1) {
      if (this.isInZone(x, y, drop1)) {
        item.nativeElement.style.backgroundColor = 'red';
      } else {
        item.nativeElement.style.backgroundColor = 'transparent';
      }
    } else if (this.list1.indexOf(curr) !== -1) {
      if (this.isInZone(x, y, drop2)) {
        item.nativeElement.style.backgroundColor = 'red';
      } else {
        item.nativeElement.style.backgroundColor = 'transparent';
      }
    }
    // item.nativeElement.style.backgroundColor = 'red';
    // console.log(item.nativeElement.innerHTML);
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
}
