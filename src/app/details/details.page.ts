import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService, RanVal } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    public dataService: DataService,
  ) { }
  id!: number;
  title!: string;
  number!: number;
  val!: RanVal;


  ngOnInit() {
    this.id = this.getParam('id');
    this.val = this.dataService.list[this.id];
    this.number = this.val?.Number;

    // console.log(this.id)
    // console.log(this.dataService.list[this.id])

    if (this.number === undefined)
      this.navController.navigateForward('/home');

    this.title = `Number ${this.number}`
    this.setSegment('Even');
  }

  getParam(name: string) {
    var _param = this.activatedRoute.snapshot.paramMap.get(name);
    if (_param == null) {
      this.navController.navigateForward('/home');
    }
    var n = Number(_param);
    return n;
  }

  segment = 'even';
  chosenList!: Number[];
  setSegment(segment: string) {
    this.segment = segment;
    if (this.segment == 'Even')
      this.chosenList = this.val.Even;
    else if (this.segment == 'Odd')
      this.chosenList = this.val.Odd;
    else
      this.chosenList = this.val.Prime;
    console.log(this.chosenList)
    console.log(this.segment)
  }

  deleteNumber(index: number) {
    this.chosenList.splice(index, 1);
    // console.log(this.chosenList)
    // console.log(this.val.Even)
  }
}
