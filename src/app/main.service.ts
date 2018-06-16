import { Injectable } from '@angular/core';
import {FilesService} from './files/files.service';
import {BGActionsService} from './bgactions/bgactions.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private fileService: FilesService,
              private bgActionsService: BGActionsService) {}

  async copyFile(source: string, target: string) {
    const bgAction = this.bgActionsService.addBGAction(`Copying from ${source} to ${target}`);
    this.fileService.copyFile(source, target)
      .then(() => {
        this.bgActionsService.updateActionSuccess(bgAction);
      })
      .catch((errObj) => {
        this.bgActionsService.updateActionFail(bgAction, errObj.error.error);
        console.log(errObj.error.error);
      });
  }

  async removeFile(path: string) {
    const bgAction = this.bgActionsService.addBGAction(`Deleting file ${path}`);
    this.fileService.removeFile(path)
      .then(() => {
        this.bgActionsService.updateActionSuccess(bgAction);
      })
      .catch((errObj) => {
        this.bgActionsService.updateActionFail(bgAction, errObj.error.error);
        console.log(errObj.error.error);
      });
  }
}
