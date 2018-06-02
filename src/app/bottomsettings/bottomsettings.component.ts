import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-bottomsettings',
  templateUrl: './bottomsettings.component.html',
  styleUrls: ['./bottomsettings.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})
export class BottomsettingsComponent implements OnInit, OnDestroy {
  @select() activeTheme;
  activeTheme$: string;
  subscriptions = [];

  constructor() {}

  ngOnInit() {
    const sub1 = this.activeTheme.subscribe((theme) => {
      this.activeTheme$ = theme;
    });

    this.subscriptions.push(sub1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

}
