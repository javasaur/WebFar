import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../store/IAppState';
import {
  changeCurrentHandleOptionAction,
  changeCurrentPathAction,
  toggleEditorModeAction,
  toggleErrorAction,
  updateFileStateAction
} from '../store/actions/action.creators';
import { getNextIndexOrFirst } from '../utils/CustomFunctions';

@Injectable({
  providedIn: 'root'
})
export class FilesActions {
  constructor(private store: NgRedux<IAppState>) {}

  changeCurrentPath(newPath: string) {
    this.store.dispatch(changeCurrentPathAction(newPath));
  }

  changeFileHandleOption() {
    const state = {...this.store.getState()};
    let openFilesOption, openFilesOptions;
    ({openFilesOption, openFilesOptions} = state);
    const ind = openFilesOptions.indexOf(openFilesOption);
    const newAction = openFilesOptions[getNextIndexOrFirst(openFilesOptions, ind + 1)];
    this.store.dispatch(changeCurrentHandleOptionAction(newAction));
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

  toggleEditorMode() {
    this.store.dispatch(toggleEditorModeAction());
  }
}


