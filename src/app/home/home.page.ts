import { Component } from '@angular/core';
import { DataService, RanVal } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showAdd = false;

  constructor(
    public dataService: DataService,
  ) {}

  toggleShowAdd() {
    this.showAdd = !this.showAdd;
  }

  number = 0;
  addNumber () {
    var v : RanVal = {
      Number: this.number,
      Even: [],
      Odd: [],
      Prime: [],
    };

    for (let i = 0; i <= this.number; i++) {
      if (i % 2 == 0) // is Even
        v.Even.push(i);
      else            // is Odd
        v.Odd.push(i);
      if (isPrime(i))
        v.Prime.push(i);
    }
    console.log(v);
    this.dataService.list.push(v);
  }
}


function isPrime(num: number): boolean {
  if (num == 0)
    return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
