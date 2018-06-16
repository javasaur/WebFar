import { BGActionStatus } from './bgactionstatus.enum';

export class BGAction {
  constructor(description, status, startTime, endTime, error) {
    this._description = description;
    this._status = status;
    this._startTime = startTime;
    this._endTime = endTime;
    this._error = error;
  }

  private _description: string;
  private _status: BGActionStatus;
  private _startTime: number;
  private _endTime: number;
  private _error: string | null;

  get error(): string {
    return this._error;
  }

  set error(value: string) {
    this._error = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get status(): BGActionStatus {
    return this._status;
  }

  set status(value: BGActionStatus) {
    this._status = value;
  }

  get startTime(): number {
    return this._startTime;
  }

  get endTime(): number {
    return this._endTime;
  }

  set endTime(value: number) {
    this._endTime = value;
  }
}
