import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../state/IAppState';
import {
  changeCurrentPathAction,
  toggleErrorAction,
  updateFileStateAction
} from './action.creators';

@Injectable({
  providedIn: 'root'
})
export class FilesActions {
  constructor(private store: NgRedux<IAppState>) {}

  changeCurrentPath(newPath: string) {
    this.store.dispatch(changeCurrentPathAction(newPath));
  }

  updateFileState(screenId, fileState) {
    const screens = [...this.store.getState().screens];
    const screen = screens[screenId];
    screen.fileState = fileState;
    this.store.dispatch(updateFileStateAction(screens));
  }

  togglePathError() {
    this.store.dispatch(toggleErrorAction());
  }
}


