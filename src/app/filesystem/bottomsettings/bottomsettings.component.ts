import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';

import { MainService } from '../../globalservices/main.service';
import {State} from '../../store/store';

@Component({
  selector: 'app-bottomsettings',
  templateUrl: './bottomsettings.component.html',
  styleUrls: ['./bottomsettings.component.scss', '../../themes/classic.scss', '../../themes/dark.scss', '../../themes/clumsy.scss']
})
export class BottomsettingsComponent implements OnInit, OnDestroy {
  openFilesOption: string
  activeTheme: string;
  subscriptions = [];
  @Output('openBGScreen') openBGScreenEmitter = new EventEmitter<void>();

  constructor(private mainService: MainService,
              private store: Store<State>) {

    const sub1 = this.store.select(state => state.app.activeTheme).subscribe(theme => this.activeTheme = theme);
    const sub2 = this.store.select(state => state.app.openFilesOption).subscribe(option => this.openFilesOption = option);

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  changeFileHandleOption() {
    this.mainService.changeFileHandleOption();
  }

  openBGScreen() {
    this.openBGScreenEmitter.emit();
  }
}
