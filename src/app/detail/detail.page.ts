import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Laptop, LaptopsService } from '../laptops.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  laptop = this.laptopsService.emptyLaptop();

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public laptopsService: LaptopsService,
  ) { }

  ngOnInit() {
    var id_ = this.activatedRoute.snapshot.paramMap.get('id');
    if (id_ == null)
      this.router.navigateByUrl('/');
    else {
      // this.id = Number(id);
      var id: number = Number(id_);
      var laptops = this.laptopsService.laptops;
      if (id < laptops.length)
        this.laptop = laptops[id];
      else
        this.router.navigateByUrl('/');
    }
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
    // 'manuDate': this.formatISODate(
    //   l.manuDate.toString()
    // ),
    'manuDate': l.manuDate.toDateString(),
  };

  formatISODate = (date : string) => date.substring(0, date.indexOf('T'));
}
