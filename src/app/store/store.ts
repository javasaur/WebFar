import {
  CHANGE_ACTIVE_SCREEN,
  INITIALIZE_SCREENS,
  MOVE_TO_NEXT_SCREEN,
  MOVE_TO_SCREEN,
  SWITCH_THEME,
  UPDATE_FILE_STATE
} from './actions';
import { Screen } from '../screen.model';

export interface IAppState {
  activeTheme: string;
  availableThemes: string[];
  screensAmount: number;
  defaultScreen: number; // not zero-based (1,2...)
  screens: Screen[];
  activeScreen: Screen | null;
}

export const INITIAL_STATE: IAppState = {
  activeTheme: 'classic',
  availableThemes: ['classic', 'dark', 'clumsy'],
  screensAmount: 2,
  defaultScreen: 1,
  screens: [],
  activeScreen: null
};

export function rootReducer(state: IAppState, action): IAppState {
  let ind, newInd, prev, curr, screen, screens;

  switch (action.type) {
    case CHANGE_ACTIVE_SCREEN:
      screens = [...state.screens];
      ({prev, curr} = definePrevAndCurrScreen(screens, {...state}, action.id - 1));
      toggleActiveProp(prev, curr);
      return Object.assign({}, state, {
        screens: screens,
        activeScreen: curr
      });

    case INITIALIZE_SCREENS:
      screens = Array.from({length: state.screensAmount}, () => (new Screen()));
      return Object.assign({}, state, {
        screens: screens
      });

    case MOVE_TO_NEXT_SCREEN:
      screens = [...state.screens];
      ind = screens.indexOf(state.activeScreen);
      newInd = getNextIndexOrFirst(screens, ind + 1);
      ({prev, curr} = definePrevAndCurrScreen(screens, {...state}, newInd));
      toggleActiveProp(prev, curr);
      return Object.assign({}, state, {
        screens: screens,
        activeScreen: curr
      });

    case MOVE_TO_SCREEN:
      screens = [...state.screens];
      ({prev, curr} = definePrevAndCurrScreen(screens, {...state}, action.screenId));
      toggleActiveProp(prev, curr);
      return Object.assign({}, state, {
        screens: screens,
        activeScreen: curr
      });

    case SWITCH_THEME:
      ind = state.availableThemes.indexOf(state.activeTheme);
      newInd = getNextIndexOrFirst(state.availableThemes, ind + 1);
      return Object.assign({}, state, {
        activeTheme: state.availableThemes[newInd]
      });

    case UPDATE_FILE_STATE:
      screens = {...state}.screens;
      screen = screens[action.screenId];
      screen.fileState = action.fileState;
      return Object.assign({}, state, {
        screens: screens
      });
  }
  return state;
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

function getNextIndexOrFirst(arr, nextIndex) {
  return nextIndex >= arr.length ? 0 : nextIndex;
}
