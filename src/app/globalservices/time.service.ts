import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getCurrentTime() {
    return moment().format('HH:mm');
  }
  constructor() {}
}
