export class Screen {
  private _isActive: boolean;
  private _event: any;
  // private fileState: File | null;

  constructor() {
    this.isActive = false;
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
