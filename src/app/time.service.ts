import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getCurrentTime() {
    return moment().format('HH:mm');
  }
  convertTimestamp(timestamp: number) {
        return moment(timestamp).format('DD:MM:YYYY HH:mm:ss');
  }
  constructor() {}
}
