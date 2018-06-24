import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { select } from '@angular-redux/store';

import { BGAction } from './bgaction.model';
import {IAppState} from '../store/IAppState';
import {State} from '../store/store';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-bgactions',
  templateUrl: './bgactions.component.html',
  styleUrls: ['./bgactions.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})
export class BgactionsComponent implements OnInit, OnDestroy {
  activeTheme: string;
  bgActions: BGAction[];
  @Output() closeBGScreen = new EventEmitter<void>();
  subscriptions = [];
  test: any;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    const sub1 = this.store.select(state => state.app.activeTheme).subscribe(theme => this.activeTheme = theme);
    const sub2 = this.store.select(state => state.app.bgActions).subscribe(actions => this.bgActions = actions);
    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  close() {
    this.closeBGScreen.emit();
  }
}
