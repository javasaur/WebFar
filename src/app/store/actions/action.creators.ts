import {
  ADD_BACKGROUND_PROCESS,
  CHANGE_ACTIVE_SCREEN,
  CHANGE_CURRENT_HANDLE_OPTION,
  CHANGE_CURRENT_PATH,
  INITIALIZE_SCREEN,
  INITIALIZE_SCREENS,
  MOVE_TO_NEXT_SCREEN,
  MOVE_TO_SCREEN,
  SWITCH_THEME,
  TOGGLE_EDITOR_MODE,
  TOGGLE_ERROR,
  UPDATE_FILE_STATE,
  WRITE_TO_BUFFER
} from './actions';

export function writeToBufferAction(buffer: string) {
  return {
    type: WRITE_TO_BUFFER,
    buffer
  };
}

export function addBGProcessAction(bgActions) {
  return {
    type: ADD_BACKGROUND_PROCESS,
    bgActions
  };
}

export function switchThemeAction(newTheme) {
  return {
    type: SWITCH_THEME,
    newTheme
  };
}

export function changeActiveScreenAction(screens, activeScreen) {
  return {
    type: CHANGE_ACTIVE_SCREEN,
    screens,
    activeScreen
  };
}

export function changeCurrentPathAction(newPath) {
  return {
    type: CHANGE_CURRENT_PATH,
    newPath
  };
}

export function changeCurrentHandleOptionAction(newAction) {
  return {
    type: CHANGE_CURRENT_HANDLE_OPTION,
    newAction
  };
}

export function initializeScreenAction(screens) {
  return {
    type: INITIALIZE_SCREEN,
    screens
  }
}

export function initializeScreensAction(screens) {
  return {
    type: INITIALIZE_SCREENS,
    screens
  };
}

export function moveToNextScreenAction(screens, activeScreen) {
  return {
    type: MOVE_TO_NEXT_SCREEN,
    screens,
    activeScreen
  };
}

export function moveToScreenAction(screens, activeScreen) {
  return {
    type: MOVE_TO_SCREEN,
    screens,
    activeScreen
  };
}

export function toggleErrorAction() {
  return {
    type: TOGGLE_ERROR
  };
}

export function toggleEditorModeAction() {
  return {
    type: TOGGLE_EDITOR_MODE
  };
}

export function updateFileStateAction(screens) {
  return {
    type: UPDATE_FILE_STATE,
    screens
  };
}
