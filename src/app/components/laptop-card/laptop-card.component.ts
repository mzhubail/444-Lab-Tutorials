import { Component, Input, OnInit } from '@angular/core';
import { Laptop } from 'src/app/services/laptops.service';

@Component({
  selector: 'app-laptop-card',
  templateUrl: './laptop-card.component.html',
  styleUrls: ['./laptop-card.component.scss'],
})
export class LaptopCardComponent  implements OnInit {
  @Input() laptop!: Laptop;
  @Input() id!: number;

  constructor() { }

  ngOnInit() {}

}
