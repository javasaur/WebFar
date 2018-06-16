import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FilesActions} from '../store/behavior/files.actions';

@Component({
  selector: 'app-bottomsettings',
  templateUrl: './bottomsettings.component.html',
  styleUrls: ['./bottomsettings.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})

export class BottomsettingsComponent implements OnInit {
  @Input() activeTheme;
  @Input() openFilesOption;
  @Output('openBGScreen') openBGScreenEmitter = new EventEmitter<void>();

  constructor(private filesActions: FilesActions) {}

  ngOnInit() {}

  changeFileHandleOption() {
    this.filesActions.changeFileHandleOption();
  }

  openBGScreen() {
    this.openBGScreenEmitter.emit();
  }
}
