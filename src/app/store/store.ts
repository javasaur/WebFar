import {
  ADD_BACKGROUND_PROCESS,
  CHANGE_ACTIVE_SCREEN,
  CHANGE_CURRENT_HANDLE_OPTION,
  CHANGE_CURRENT_PATH,
  INITIALIZE_SCREEN,
  CREATE_SCREENS,
  MOVE_TO_NEXT_SCREEN,
  MOVE_TO_SCREEN,
  SWITCH_THEME,
  TOGGLE_EDITOR_MODE,
  TOGGLE_ERROR,
  UPDATE_FILE_STATE,
  WRITE_TO_BUFFER,
} from './actions/actions';
import { IAppState } from './IAppState';

export const INITIAL_STATE: IAppState = {
  activeTheme: 'dark',
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
  bgActions: [],
  buffer: null
};

export interface State {
  app: IAppState;
}

export function mainReducer(state: IAppState = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BACKGROUND_PROCESS:
      return {...state, bgActions: action.bgActions}

    case CHANGE_ACTIVE_SCREEN:
      return {...state, screens: action.screens, activeScreen: action.activeScreen};

    case CHANGE_CURRENT_PATH:
      return {...state, currentPath: action.newPath};

    case CHANGE_CURRENT_HANDLE_OPTION:
      return {...state, openFilesOption: action.newAction};

    case INITIALIZE_SCREEN:
      return {...state, screens: action.screens};

    case CREATE_SCREENS:
      return {...state, screens: action.screens};

    case MOVE_TO_NEXT_SCREEN:
      return {...state, screens: action.screens, activeScreen: action.activeScreen};

    case MOVE_TO_SCREEN:
      return {...state, screens: action.screens, activeScreen: action.activeScreen};

    case SWITCH_THEME:
      return {...state, activeTheme: action.newTheme};

    case TOGGLE_ERROR:
      return {...state, pathError: !state.pathError};

    case TOGGLE_EDITOR_MODE:
      return {...state, editorMode: !state.editorMode};

    case UPDATE_FILE_STATE:
      return {...state, screens: action.screens};

    case WRITE_TO_BUFFER:
      return {...state, buffer: action.buffer};

    default:
      return state;
  }
}
