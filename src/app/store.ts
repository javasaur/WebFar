import { SWITCH_THEME } from './actions';

export interface IAppState {
  activeTheme: string;
  availableThemes: Array<string>;
}

export const INITIAL_STATE: IAppState = {
  activeTheme: 'dark',
  availableThemes: ['classic', 'dark']
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case SWITCH_THEME:
      const ind = state.availableThemes.indexOf(state.activeTheme);
      const newInd = ind >= state.availableThemes.length - 1 ? 0 : ind + 1;
      return Object.assign({}, state, {
        activeTheme: state.availableThemes[newInd]
      });
  }
  return state;
}
