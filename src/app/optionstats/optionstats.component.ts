import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { File } from '../file';
import {TimeService} from '../time.service';

@Component({
  selector: 'app-optionstats',
  templateUrl: './optionstats.component.html',
  styleUrls: ['./optionstats.component.css']
})
export class OptionstatsComponent implements OnInit {
  @Input() file: File;
  modifiedDate: string;
  convertTimestamp() {
    if(!!this.file) {
      this.modifiedDate = this.timeService.convertTimestamp(this.file.modifiedDate);
    }
  }
  constructor(private timeService: TimeService) { }

  ngOnInit() {
    this.convertTimestamp();
  }
  ngDoCheck() {
    this.convertTimestamp();
  }

}
