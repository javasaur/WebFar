import { Injectable } from '@angular/core';
import {ScreenActions} from './store/behavior/screen.actions';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private screenActions: ScreenActions) {}

  moveToNextScreen() {
    this.screenActions.moveToNextScreen();
  }

  moveToScreen(screenId: number) {
    this.screenActions.moveToScreen(screenId);
  }

  setupScreens() {
    this.screenActions.setupScreens();
  }
}
