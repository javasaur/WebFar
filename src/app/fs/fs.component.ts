import { Component, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { Screen } from './screen.model';
import { ScreenActions } from '../store/behavior/screen.actions';
import { FilesActions } from '../store/behavior/files.actions';
import { IAppState } from '../store/state/IAppState';
import { ThemeActions } from '../store/behavior/theme.actions';

@Component({
  selector: 'app-fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.scss']
})

export class FsComponent implements OnInit, OnDestroy {
  @select() activeTheme;
  @Output() activeTheme$: string;
  @select() screens;
  screens$: Screen[];
  @select() activeScreen;
  activeScreen$: Screen;
  @select() currentPath;
  @Output() currentPath$: string;
  @select() pathError;
  @Output() pathError$;
  subscriptions = [];

  constructor(private store: NgRedux<IAppState>,
              private filesActions: FilesActions,
              private themeActions: ThemeActions,
              private screenActions: ScreenActions,
              private _router: Router) {
  }

  ngOnInit() {
    this.setSubscriptionToStore();
    this.screenActions.setupScreens();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();

    const key = event.key;
    if (key === 'q') {
      this.themeActions.switchTheme();
      return;
    }

    if (key === 'Tab') {
      this.screenActions.moveToNextScreen();
    }

    this.passEventToActiveScreen(event);
  }

  moveToScreen(screenId) {
    this.screenActions.moveToScreen(screenId);
  }

  navigateToErrorPage() {
    this._router.navigateByUrl('error');
  }

  passEventToActiveScreen(event) {
    this.activeScreen$.event = event;
  }

  setSubscriptionToStore() {
    const sub1 = this.screens.subscribe((screens: Screen[]) => {
      this.screens$ = screens;
    });
    const sub2 = this.activeTheme.subscribe((theme: string) => {
      this.activeTheme$ = theme;
    });
    const sub3 = this.activeScreen.subscribe((screen: Screen) => {
      this.activeScreen$ = screen;
    });
    const sub4 = this.currentPath.subscribe((path: string) => {
      // this.currentPath$ = path;
    });
    const sub5 = this.pathError.subscribe((error: boolean) => {
      this.pathError$ = error;
      if (error) {
        this.navigateToErrorPage();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2, sub3, sub4, sub5]);
  }

}
