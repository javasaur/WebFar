import { Component, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BGAction } from '../../bgactions/bgaction.model';
import { MainService } from '../../globalservices/main.service';
import { Screen } from '../screen/screen.model';
import {State} from '../../store/store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss']
})
export class MainScreenComponent implements OnInit, OnDestroy {
  @Output() activeTheme: string;
  screens: Screen[];
  activeScreen: Screen;
  @Output() currentPath: string;
  @Output() pathError;
  subscriptions = [];
  openFilesOption: string;
  showBGActionsScreen = false;
  bgActions: BGAction[];

  constructor(private store: Store<State>,
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
    this.activeScreen.event = event;
  }

  toggleBGScreen() {
    this.showBGActionsScreen = !this.showBGActionsScreen;
  }

  setSubscriptionToStore() {
    const sub1 = this.store.select(state => state.app.screens).subscribe(screens => this.screens = screens);
    const sub2 = this.store.select(state => state.app.activeTheme).subscribe(theme => this.activeTheme = theme);
    const sub3 = this.store.select(state => state.app.activeScreen).subscribe(screen => this.activeScreen = screen);
    const sub4 = this.store.select(state => state.app.openFilesOption).subscribe(option => this.openFilesOption = option);
    const sub5 = this.store.select(state => state.app.bgActions).subscribe(actions => this.bgActions = actions);
    const sub6 = this.store.select(state => state.app.pathError).subscribe(error => {
      this.pathError = error;
      if (error) {
        this.navigateToErrorPage();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2, sub3, sub4, sub5, sub6]);
  }

}
