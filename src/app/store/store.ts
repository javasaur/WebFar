import {
  CHANGE_ACTIVE_SCREEN,
  INITIALIZE_SCREENS,
  MOVE_TO_NEXT_SCREEN,
  MOVE_TO_SCREEN,
  SWITCH_THEME,
  UPDATE_FILE_STATE
} from './actions';
import { IAppState } from './IAppState';

export const INITIAL_STATE: IAppState = {
  activeTheme: 'classic',
  availableThemes: ['classic', 'dark', 'clumsy'],
  screensAmount: 2,
  defaultScreen: 1,
  screens: [],
  activeScreen: null
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case CHANGE_ACTIVE_SCREEN:
      return Object.assign({}, state, {
        screens: action.screens,
        activeScreen: action.activeScreen
      });

    case INITIALIZE_SCREENS:
      return Object.assign({}, state, {
        screens: action.screens
      });

    case MOVE_TO_NEXT_SCREEN:
      return Object.assign({}, state, {
        screens: action.screens,
        activeScreen: action.activeScreen
      });

    case MOVE_TO_SCREEN:
      return Object.assign({}, state, {
        screens: action.screens,
        activeScreen: action.activeScreen
      });

    case SWITCH_THEME:
      return Object.assign({}, state, {
        activeTheme: action.newTheme
      });

    case UPDATE_FILE_STATE:
      return Object.assign({}, state, {
        screens: action.screens
      });
  }
  return state;
}
