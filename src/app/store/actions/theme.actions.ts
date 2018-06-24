import { Injectable } from '@angular/core';

import {getNextIndexOrFirst, getState} from '../../utils/CustomFunctions';
import { switchThemeAction } from './action.creators';
import {State} from '../store';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ThemeActions {
  constructor(private store: Store<State>) {}

  switchTheme() {
    let availableThemes, activeTheme;
    ({availableThemes, activeTheme} = getState(this.store).app);
    const currInd = availableThemes.indexOf(activeTheme);
    const newInd = getNextIndexOrFirst(availableThemes, currInd + 1);
    this.store.dispatch(switchThemeAction(availableThemes[newInd]));
  }
}


