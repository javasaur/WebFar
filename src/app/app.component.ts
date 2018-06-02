///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Event, Router, RoutesRecognized } from '@angular/router';
import { select } from '@angular-redux/store';

import {FilesActions} from './store/behavior/files.actions';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  @select() pathError;
  pathError$: string;
  subscriptions = [];

  constructor(private _router: Router,
              private filesActions: FilesActions) {
  }

  ngOnInit() {
    const sub1 = this.pathError.subscribe((error) => {
      this.pathError$ = error;
    });

    const sub2 = this._router.events.subscribe((event: Event) => {
      if (!!event && event instanceof RoutesRecognized) {
        const path = event.state.root.firstChild.queryParams.path;
        if (!this.pathError$) {
          this.filesActions.changeCurrentPath(path);
        }
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }
}
