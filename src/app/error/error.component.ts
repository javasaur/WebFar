import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

import { MainService } from '../globalservices/main.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  @Input() themeClass: string;
  @select() currentPath;
  @select() activeTheme;
  path$: string;
  activeTheme$: string;
  subscriptions = [];

  constructor(private mainService: MainService) {}

  ngOnInit() {
    const sub1 = this.currentPath.subscribe((path) => this.path$ = path);
    const sub2 = this.activeTheme.subscribe((theme) => this.activeTheme$ = theme);

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  togglePathError() {
    this.mainService.togglePathError();
  }
}
