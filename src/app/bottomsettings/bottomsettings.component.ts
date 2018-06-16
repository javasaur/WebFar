import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FilesActions} from '../store/behavior/files.actions';
import {MainService} from '../main.service';

@Component({
  selector: 'app-bottomsettings',
  templateUrl: './bottomsettings.component.html',
  styleUrls: ['./bottomsettings.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})

export class BottomsettingsComponent implements OnInit {
  @Input() activeTheme;
  @Input() openFilesOption;
  @Output('openBGScreen') openBGScreenEmitter = new EventEmitter<void>();

  constructor(private mainService: MainService) {}

  ngOnInit() {}

  changeFileHandleOption() {
    this.mainService.changeFileHandleOption();
  }

  openBGScreen() {
    this.openBGScreenEmitter.emit();
  }
}
