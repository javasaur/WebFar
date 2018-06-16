import {Injectable} from '@angular/core';
import {FilesService} from './files/files.service';
import {BGActionsService} from './bgactions/bgactions.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from './store/state/IAppState';
import {TimeService} from './time.service';
import {BufferService} from './buffer.service';
import {ThemeService} from './theme.service';
import {ScreenService} from './screen.service';
import {File} from './files/file.model';
import { Screen } from './fs/screen.model';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private bufferService: BufferService,
              private fileService: FilesService,
              private bgActionsService: BGActionsService,
              private screenService: ScreenService,
              private timeService: TimeService,
              private themeService: ThemeService,
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

  changeFileHandleOption() {
    this.fileService.changeFileHandleOption();
  }

  togglePathError() {
    this.fileService.togglePathError();
  }

  getContentOfFile(path: any) {
    return this.fileService.getContentOfFile(path);
  }

  toggleEditorMode() {
    this.fileService.toggleEditorMode();
  }

  getCurrentTime() {
    return this.timeService.getCurrentTime();
  }

  writeToBuffer(path: string) {
    this.bufferService.writeToBuffer(path);
  }

  switchTheme() {
    this.themeService.switchTheme();
  }

  setupScreens() {
    this.screenService.setupScreens();
  }

  moveToScreen(screenId: number) {
    this.screenService.moveToScreen(screenId);
  }

  moveToNextScreen() {
    this.screenService.moveToNextScreen();
  }

  readFromBuffer() {
    return this.bufferService.readFromBuffer();
  }

  changeCurrentPath(path: string) {
    this.fileService.changeCurrentPath(path);
  }

  passControlToOS(file: File) {
    this.fileService.passControlToOS(file);
  }

  updateFileState(path: string, screenId: number, screen: Screen) {
    return this.fileService.updateFileState(path, screenId, screen);
  }
}
