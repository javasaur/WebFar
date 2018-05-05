import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getCurrentTime() {
    const d = new Date();
    const mins = (d.getMinutes()).toString().padStart(2, '0');
    const str = d.getHours() + ':' + mins;
    return str;
  }
  constructor() { }
}
