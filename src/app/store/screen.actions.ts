import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './IAppState';
import {Screen} from '../screen.model';
import {
  changeActiveScreenACtion,
  initializeScreensAction,
  moveToNextScreenAction,
  moveToScreenAction} from './action.creators';
import {getNextIndexOrFirst} from '../utils/CustomFunctions';

@Injectable({
  providedIn: 'root'
})
export class ScreenActions {
  constructor(private store: NgRedux<IAppState>) {}

  activateDefaultScreen() {
    this.activateScreen(this.store.getState().defaultScreen);
  }

  activateScreen(screenId) {
    let prev, curr;
    const state = {...this.store.getState()};
    const screens = [...this.store.getState().screens];

    ({prev, curr} = definePrevAndCurrScreen(screens, state, screenId - 1));
    toggleActiveProp(prev, curr);
    this.store.dispatch(changeActiveScreenACtion(screens, curr));
  }

  initializeScreens() {
    const screens = Array.from({length: this.store.getState().screensAmount}, () => (new Screen()));
    this.store.dispatch(initializeScreensAction(screens));
  }

  moveToNextScreen() {
    let prev, curr;
    const state = {...this.store.getState()};
    const screens = [...state.screens];
    const ind = screens.indexOf(state.activeScreen);
    const newInd = getNextIndexOrFirst(screens, ind + 1);
    ({prev, curr} = definePrevAndCurrScreen(screens, state, newInd));
    toggleActiveProp(prev, curr);
    this.store.dispatch(moveToNextScreenAction(screens, curr));
  }

  moveToScreen(screenId) {
    let prev, curr;
    const state = {...this.store.getState()};
    const screens = [...state.screens];
    const ind = screens.indexOf(state.activeScreen);
    ({prev, curr} = definePrevAndCurrScreen(screens, state, screenId));
    toggleActiveProp(prev, curr);
    this.store.dispatch(moveToScreenAction(screens, curr));
  }

  setupScreens() {
    this.initializeScreens();
    this.activateDefaultScreen();
  }
}


// Current screen index differs for switching screens and initial screen load
function definePrevAndCurrScreen(screens, state, currNewId) {
  // The current active screen becomes previous
  // The 'new' current screen is defined by provided index
  const prev = screens.find((obj) => obj === state.activeScreen);
  return {
    prev: prev,
    curr: screens[currNewId]
  };
}

function toggleActiveProp(prev: Screen, curr: Screen) {
  if (prev) {
    prev.isActive = false;
  }
  curr.isActive = true;
}
