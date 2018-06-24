import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../IAppState';
import { writeToBufferAction } from './action.creators';
import {State} from '../store';
import {Store} from '@ngrx/store';
import {getState} from '../../utils/CustomFunctions';

@Injectable({
  providedIn: 'root'
})
export class BufferActions {
  constructor(private store: Store<State>) {}

  writeToBuffer(data: string) {
    this.store.dispatch(writeToBufferAction(data));
  }

  readFromBuffer(): string {
    return getState(this.store).app.buffer;
  }
}


