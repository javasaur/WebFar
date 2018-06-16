import { Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { Screen } from './screen.model';
import { IAppState } from '../store/state/IAppState';
import {BGAction} from '../bgactions/bgaction.model';
import {MainService} from '../main.service';

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
  @select() openFilesOption;
  openFilesOption$: string;
  showBGActionsScreen = false;
  @select() bgActions;
  bgActions$: BGAction[];


  constructor(private store: NgRedux<IAppState>,
              private mainService: MainService,
              private _router: Router) {
  }

  ngOnInit() {
    this.setSubscriptionToStore();
    this.mainService.setupScreens();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  copyFile(target) {
    const buffer = this.mainService.readFromBuffer();
    this.toggleBGScreen();
    this.mainService.copyFile(buffer, target);
  }

  removeFile(path) {
    this.toggleBGScreen();
    this.mainService.removeFile(path);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'Tab') {
      event.preventDefault();
      this.mainService.moveToNextScreen();
    }

    if (key === 'q') {
      this.mainService.switchTheme();
      return;
    }

    this.passEventToActiveScreen(event);
  }

  moveToScreen(screenId) {
    this.mainService.moveToScreen(screenId);
  }

  navigateToErrorPage() {
    this._router.navigateByUrl('error');
  }

  passEventToActiveScreen(event) {
    this.activeScreen$.event = event;
  }

  toggleBGScreen() {
    this.showBGActionsScreen = !this.showBGActionsScreen;
  }

  setSubscriptionToStore() {
    const sub1 = this.screens.subscribe((screens: Screen[]) => this.screens$ = screens);
    const sub2 = this.activeTheme.subscribe((theme: string) => this.activeTheme$ = theme);
    const sub3 = this.activeScreen.subscribe((screen: Screen) => this.activeScreen$ = screen);
    const sub4 = this.openFilesOption.subscribe((option: string) => this.openFilesOption$ = option);
    const sub5 = this.bgActions.subscribe((actions: BGAction[]) => this.bgActions$ = actions);
    const sub6 = this.pathError.subscribe((error: boolean) => {
      this.pathError$ = error;
      if (error) {
        this.navigateToErrorPage();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2, sub3, sub4, sub5, sub6]);
  }

}
