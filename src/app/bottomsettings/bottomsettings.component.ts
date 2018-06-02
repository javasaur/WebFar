import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import {FilesActions} from '../store/behavior/files.actions';

@Component({
  selector: 'app-bottomsettings',
  templateUrl: './bottomsettings.component.html',
  styleUrls: ['./bottomsettings.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})
export class BottomsettingsComponent implements OnInit, OnDestroy {
  @select() activeTheme;
  activeTheme$: string;
  @select() openFilesOption;
  openFilesOption$: string;
  subscriptions = [];

  constructor(private filesActions: FilesActions) {}

  ngOnInit() {
    const sub1 = this.activeTheme.subscribe((theme) => {
      this.activeTheme$ = theme;
    });

    const sub2 = this.openFilesOption.subscribe((theme) => {
      this.openFilesOption$ = theme;
    });

    this.subscriptions.push(sub1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  changeOption() {
    this.filesActions.changeFileHandleOption();
  }

}
