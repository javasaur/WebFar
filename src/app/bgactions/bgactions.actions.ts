import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { addBGProcessAction } from '../store/actions/action.creators';
import { BGAction } from './bgaction.model';
import { IAppState } from '../store/IAppState';

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


