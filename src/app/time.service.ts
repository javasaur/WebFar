import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getCurrentTime() {
    const d = new Date();
    const str = d.getHours() + ':' + d.getMinutes();
    return str;
  }
  constructor() { }
}
