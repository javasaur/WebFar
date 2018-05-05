import { Component, OnInit, Input } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-menuheader',
  templateUrl: './menuheader.component.html',
  styleUrls: ['./menuheader.component.css']
})

export class MenuheaderComponent implements OnInit {
  @Input() currentFolder;
  currentTime: string;

  setCurrentTime(obj): void {
    obj.currentTime = obj.timeService.getCurrentTime();
    setInterval(function() {
      obj.currentTime = obj.timeService.getCurrentTime();
    }, 60000);
  }
  constructor(private timeService: TimeService) {
  }
  ngOnInit() {
    this.setCurrentTime(this);
  }
}
