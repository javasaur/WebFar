import { Injectable } from '@angular/core';

import {
  changeCurrentHandleOptionAction,
  changeCurrentPathAction,
  toggleEditorModeAction,
  toggleErrorAction,
  updateFileStateAction
} from '../store/actions/action.creators';
import {getNextIndexOrFirst, getState} from '../utils/CustomFunctions';
import {State} from '../store/store';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class FilesActions {
  constructor(private store: Store<State>) {}

  changeCurrentPath(newPath: string) {
    this.store.dispatch(changeCurrentPathAction(newPath));
  }

  changeFileHandleOption() {
    const state = {...getState(this.store).app};
    let openFilesOption, openFilesOptions;
    ({openFilesOption, openFilesOptions} = state);
    const ind = openFilesOptions.indexOf(openFilesOption);
    const newAction = openFilesOptions[getNextIndexOrFirst(openFilesOptions, ind + 1)];
    this.store.dispatch(changeCurrentHandleOptionAction(newAction));
  }

  updateFileState(screenId, fileState) {
    const screens = [...getState(this.store).app.screens];
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


