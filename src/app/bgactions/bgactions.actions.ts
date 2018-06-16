import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/state/IAppState';
import {addBGProcessAction} from '../store/behavior/action.creators';
import {BGAction} from './bgaction.model';

@Injectable({
  providedIn: 'root'
})

export class BGActions {
  constructor(private store: NgRedux<IAppState>) {}

  addBGProcess(process: BGAction) {
    const bgActions = [...this.store.getState().bgActions];
    bgActions.unshift(process);
    this.store.dispatch(addBGProcessAction(bgActions));
  }
}


