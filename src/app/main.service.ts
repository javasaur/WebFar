import { Injectable } from '@angular/core';
import {FilesService} from './files/files.service';
import {BGActionsService} from './bgactions/bgactions.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from './store/state/IAppState';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private fileService: FilesService,
              private bgActionsService: BGActionsService,
              private store: NgRedux<IAppState>) {}

  async copyFile(source: string, target: string) {
    const bgAction = this.bgActionsService.addBGAction(`Copying from ${source} to ${target}`);
    this.fileService.copyFile(source, target)
      .then(() => {
        this.bgActionsService.updateActionSuccess(bgAction);
        this.updateAllScreens();
      })
      .catch((errObj) => this.bgActionsService.updateActionFail(bgAction, errObj.error.error));
  }

  async removeFile(path: string) {
    const bgAction = this.bgActionsService.addBGAction(`Deleting file ${path}`);
    this.fileService.removeFile(path)
      .then(() => {
        this.bgActionsService.updateActionSuccess(bgAction);
        this.updateAllScreens();
      })
      .catch((errObj) => this.bgActionsService.updateActionFail(bgAction, errObj.error.error));
  }

  async updateAllScreens() {
    const screens = [...this.store.getState().screens];
    screens.forEach((screen, index) => {
      this.fileService.updateFileState(screen.fileState, index, screen);
    });
  }
}
