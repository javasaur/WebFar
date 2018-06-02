import { Component, OnInit } from '@angular/core';
import { Event, Router, RoutesRecognized } from '@angular/router';
import { select } from '@angular-redux/store';

import {FilesActions} from './store/behavior/files.actions';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  @select() pathError;
  pathError$: string;

  constructor(private _router: Router,
              private filesActions: FilesActions){
  }

  ngOnInit() {
    this.pathError.subscribe((error) => {
      this.pathError$ = error;
    });

    this._router.events.subscribe((event: Event) => {
      if (!!event && event instanceof RoutesRecognized) {
        const path = event.state.root.firstChild.queryParams.path;
        if(!this.pathError$) {
          this.filesActions.changeCurrentPath(path);
        }
      }
    });
  }
}
