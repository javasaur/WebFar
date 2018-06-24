import { Injectable } from '@angular/core';

import { Screen } from './screen/screen.model';
import {
  changeActiveScreenAction,
  initializeScreenAction,
  createScreensAction,
  moveToNextScreenAction,
  moveToScreenAction
} from '../store/actions/action.creators';
import {getNextIndexOrFirst, getState} from '../utils/CustomFunctions';
import {State} from '../store/store';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ScreenActions {
  constructor(private store: Store<State>) {}

  activateDefaultScreen() {
    this.activateScreen(getState(this.store).app.defaultScreen);
  }

  activateScreen(screenId) {
    let prev, curr;
    const state = {...getState(this.store).app};
    const screens = [...getState(this.store).app.screens];

    ({prev, curr} = definePrevAndCurrScreen(screens, state, screenId - 1));
    toggleActiveProp(prev, curr);
    this.store.dispatch(changeActiveScreenAction(screens, curr));
  }

  initializeScreen(screenId) {
    const screens = [...getState(this.store).app.screens];
    screens[screenId].isInitialised = true;
    this.store.dispatch(initializeScreenAction(screens));
  }

  createScreens() {
    const screens = Array.from({length: getState(this.store).app.screensAmount}, () => (new Screen()));
    this.store.dispatch(createScreensAction(screens));
  }

  moveToNextScreen() {
    let prev, curr;
    const state = {...getState(this.store).app};
    const screens = [...state.screens];
    const ind = screens.indexOf(state.activeScreen);
    const newInd = getNextIndexOrFirst(screens, ind + 1);
    ({prev, curr} = definePrevAndCurrScreen(screens, state, newInd));
    curr.isDeactivated = false;
    toggleActiveProp(prev, curr);
    this.store.dispatch(moveToNextScreenAction(screens, curr));
  }

  moveToScreen(screenId) {
    let prev, curr;
    const state = {...getState(this.store).app};
    const screens = [...state.screens];
    ({prev, curr} = definePrevAndCurrScreen(screens, state, screenId));
    curr.isDeactivated = false;
    toggleActiveProp(prev, curr);
    this.store.dispatch(moveToScreenAction(screens, curr));
  }

  setupScreens() {
    this.createScreens();
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
