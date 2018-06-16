import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, Router, RoutesRecognized } from '@angular/router';
import { select } from '@angular-redux/store';

import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @select() pathError;
  pathError$: string;
  subscriptions = [];
  editorMode$: boolean;
  @select() editorMode;

  constructor(private _router: Router,
              private mainService: MainService) {
  }

  ngOnInit() {
    const sub1 = this.pathError.subscribe((error) => this.pathError$ = error);
    const sub2 = this.editorMode.subscribe((mode) => this.editorMode$ = mode);
    const sub3 = this._router.events.subscribe((event: Event) => {
      if (!!event && event instanceof RoutesRecognized) {
        const path = event.state.root.firstChild.queryParams.path;
        if (!this.pathError$ && !this.editorMode$) {
          this.mainService.changeCurrentPath(path);
        }
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2, sub3]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
