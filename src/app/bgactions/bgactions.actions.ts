import { Injectable } from '@angular/core';

import { addBGProcessAction } from '../store/actions/action.creators';
import { BGAction } from './bgaction.model';
import { IAppState } from '../store/IAppState';
import {getState} from '../utils/CustomFunctions';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BGActions {
  constructor(private store: Store<IAppState>) {}

  addBGProcess(process: BGAction) {
    const bgActions = [...getState(this.store).app.bgActions];
    bgActions.unshift(process);
    this.store.dispatch(addBGProcessAction(bgActions));
  }
}


