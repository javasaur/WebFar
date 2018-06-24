import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

import { MainService } from '../globalservices/main.service';
import {Store} from '@ngrx/store';
import {State} from '../store/store';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  path: string;
  activeTheme: string;
  subscriptions = [];

  constructor(private mainService: MainService,
              private store: Store<State>) {}

  ngOnInit() {
    const sub1 = this.store.select(state => state.app.currentPath).subscribe(path => this.path = path);
    const sub2 = this.store.select(state => state.app.activeTheme).subscribe(theme => this.activeTheme = theme);

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  togglePathError() {
    this.mainService.togglePathError();
  }
}
