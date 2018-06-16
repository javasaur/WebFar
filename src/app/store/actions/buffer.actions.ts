import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../IAppState';
import { writeToBufferAction } from './action.creators';

@Injectable({
  providedIn: 'root'
})
export class BufferActions {
  constructor(private store: NgRedux<IAppState>) {}

  writeToBuffer(data: string) {
    this.store.dispatch(writeToBufferAction(data));
  }

  readFromBuffer(): string {
    return this.store.getState().buffer;
  }
}


