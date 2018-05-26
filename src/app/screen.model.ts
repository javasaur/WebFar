import { File } from './files/file.model';

export class Screen {
  private _isActive: boolean;
  private _event: any;
  private _fileState: File | null;

  constructor() {
    this.isActive = false;
  }

  get fileState(): File | null {
    return this._fileState;
  }

  set fileState(value: File | null) {
    this._fileState = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get event(): any {
    return this._event;
  }

  set event(value: any) {
    this._event = value;
  }
}
