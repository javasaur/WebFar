import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getCurrentTime() {
    const d = new Date();
    const mins = this.padWithZero(d.getMinutes().toString());
    const hours = this.padWithZero(d.getHours().toString());
    return mins + ':' + hours;
  }
  convertTimestamp(timestamp: number) {
    const d = new Date(timestamp);
    const day = this.padWithZero(d.getDay().toString());
    const month = this.padWithZero(d.getMonth().toString());
    const year = this.padWithZero(d.getFullYear().toString());
    const hours = this.padWithZero(d.getHours().toString());
    const mins = this.padWithZero(d.getMinutes().toString());
    const seconds = this.padWithZero(d.getSeconds().toString());
    return day + ':' + month + ':' + year + ' ' + hours + ':' + mins + ':' + seconds;
  }
  padWithZero(p: string){
    return p.padStart(2, '0');
  }
  constructor() { }
}
