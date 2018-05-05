import { Component, OnInit, Input} from '@angular/core';
import { File } from '../file';

@Component({
  selector: 'app-optionstats',
  templateUrl: './optionstats.component.html',
  styleUrls: ['./optionstats.component.css']
})
export class OptionstatsComponent implements OnInit {
  @Input() file: File;
  constructor() { }

  ngOnInit() {
  }
}
