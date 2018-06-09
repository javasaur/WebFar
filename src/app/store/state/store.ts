import {
  CHANGE_CURRENT_PATH,
  CHANGE_ACTIVE_SCREEN,
  INITIALIZE_SCREENS,
  MOVE_TO_NEXT_SCREEN,
  MOVE_TO_SCREEN,
  SWITCH_THEME,
  UPDATE_FILE_STATE, TOGGLE_ERROR, INITIALIZE_SCREEN, CHANGE_CURRENT_HANDLE_OPTION, TOGGLE_EDITOR_MODE
} from '../behavior/actions';
import { IAppState } from './IAppState';

export const INITIAL_STATE: IAppState = {
  activeTheme: 'classic',
  availableThemes: ['classic', 'dark', 'clumsy'],
  screensAmount: 2,
  defaultScreen: 1,
  screens: [],
  activeScreen: null,
  currentPath: null,
  pathError: false,
  openFilesOption: 'app',
  openFilesOptions: ['app', 'os'],
  editorMode: false,
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case CHANGE_ACTIVE_SCREEN:
      return Object.assign({}, state, {
        screens: action.screens,
        activeScreen: action.activeScreen
      });

    case CHANGE_CURRENT_PATH:
      return Object.assign({}, state, {
        currentPath: action.newPath
      });

    case CHANGE_CURRENT_HANDLE_OPTION:
      return Object.assign({}, state, {
        openFilesOption: action.newAction
      });

    case INITIALIZE_SCREEN:
      return Object.assign({}, state, {
        screens: action.screens
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

    case TOGGLE_ERROR:
      return Object.assign({}, state, {
        pathError: !state.pathError
      });

    case TOGGLE_EDITOR_MODE:
      return Object.assign({}, state, {
        editorMode: !state.editorMode
      });

    case UPDATE_FILE_STATE:
      return Object.assign({}, state, {
        screens: action.screens
      });
  }
  return state;
}
