import {
  CHANGE_ACTIVE_SCREEN,
  INITIALIZE_SCREENS,
  MOVE_TO_NEXT_SCREEN,
  MOVE_TO_SCREEN,
  SWITCH_THEME,
  UPDATE_FILE_STATE} from './actions';

export function switchThemeAction(newTheme) {
  return {
    type: SWITCH_THEME,
    newTheme
  };
}

export function changeActiveScreenACtion(screens, activeScreen) {
  return {
    type: CHANGE_ACTIVE_SCREEN,
    screens,
    activeScreen
  };
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

export function updateFileStateAction(screens) {
  return {
    type: UPDATE_FILE_STATE,
    screens
  };
}
