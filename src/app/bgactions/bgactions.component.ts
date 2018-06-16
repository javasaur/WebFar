import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BGAction} from './bgaction.model';
import {select} from '@angular-redux/store';

@Component({
  selector: 'app-bgactions',
  templateUrl: './bgactions.component.html',
  styleUrls: ['./bgactions.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})
export class BgactionsComponent implements OnInit, OnDestroy {
  @select() activeTheme;
  activeTheme$: string;
  @select() bgActions;
  bgActions$: BGAction[];
  @Output() closeBGScreen = new EventEmitter<void>();
  subscriptions = [];

  constructor() {}

  ngOnInit() {
    const sub1 = this.activeTheme.subscribe((theme) => this.activeTheme$ = theme);
    const sub2 = this.bgActions.subscribe((actions) => this.bgActions$ = actions);

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  close() {
    this.closeBGScreen.emit();
  }
}
