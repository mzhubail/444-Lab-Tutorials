import { Component } from '@angular/core';
import { DataService, RanVal } from '../data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showAdd = false;
  list;
  filterNumber = '';

  constructor(
    public dataService: DataService,
    public loadingCtrl: LoadingController,
  ) {
    this.list = dataService.list
  }

  toggleShowAdd() {
    this.showAdd = !this.showAdd;
  }

  number = 0;
  async addNumber (isRandom = false) {
    var num = isRandom
        ? Math.floor((Math.random() * 100) + 1)
        : this.number;

    const loading = await this.loadingCtrl.create({
      message: `Adding ${num} please wait..`,
      duration: 500,
    });
    await loading.present();

    var v : RanVal = {
      Number: num,
      Even: [],
      Odd: [],
      Prime: [],
    };

    for (let i = 0; i <= num; i++) {
      if (i % 2 == 0) // is Even
        v.Even.push(i);
      else            // is Odd
        v.Odd.push(i);
      if (isPrime(i))
        v.Prime.push(i);
    }
    // console.log(v);
    this.dataService.list.push(v);
    this.filter();
  }

  filter () {
    console.log(this.filterNumber)
    if (this.filterNumber === '') {
      this.list = this.dataService.list;
      return
    }

    var i = Number(this.filterNumber)
    if (i === Number.NaN) {
      this.list = this.dataService.list;
      return;
    }

    this.list = this.dataService.list.filter(
      v => {
        var num = v.Number
        // return num % 10 === i || Math.floor(num / 10) === i
        return num.toString().includes(i.toString())
      }
    )
  }
}


function isPrime(num: number): boolean {
  if (num == 0 || num == 1)
    return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
