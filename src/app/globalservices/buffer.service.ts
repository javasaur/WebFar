import { Injectable } from '@angular/core';

import { BufferActions } from '../store/actions/buffer.actions';

@Injectable({
  providedIn: 'root'
})
export class BufferService {

  constructor(private bufferActions: BufferActions) {}

  readFromBuffer() {
    return this.bufferActions.readFromBuffer();
  }

  writeToBuffer(path: string) {
    this.bufferActions.writeToBuffer(path);
  }
}
