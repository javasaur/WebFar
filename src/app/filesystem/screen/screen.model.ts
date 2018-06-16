import { File } from '../file.model';

export class Screen {
  private _isActive: boolean;
  private _event: any;
  private _fileState: File | null;
  private _isDeactivated: boolean;
  private _isInitialised: boolean;

  constructor() {
    this.isActive = false;
    this.isDeactivated = false;
  }

  get isInitialised(): boolean {
    return this._isInitialised;
  }

  set isInitialised(value: boolean) {
    this._isInitialised = value;
  }

  get isDeactivated(): boolean {
    return this._isDeactivated;
  }

  set isDeactivated(value: boolean) {
    this._isDeactivated = value;
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
