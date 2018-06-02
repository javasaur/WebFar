import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../state/IAppState';
import { switchThemeAction } from './action.creators';
import { getNextIndexOrFirst } from '../../utils/CustomFunctions';

@Injectable({
  providedIn: 'root'
})

export class ThemeActions {
  constructor(private store: NgRedux<IAppState>) {}

  switchTheme() {
    let availableThemes, activeTheme;
    ({availableThemes, activeTheme} = this.store.getState());
    const currInd = availableThemes.indexOf(activeTheme);
    const newInd = getNextIndexOrFirst(availableThemes, currInd + 1);
    this.store.dispatch(switchThemeAction(availableThemes[newInd]));
  }
}


