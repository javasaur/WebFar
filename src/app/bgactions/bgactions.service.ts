import {Injectable} from '@angular/core';
import {BGActions} from './bgactions.actions';
import {BGActionStatus} from './bgactionstatus.enum';
import {BGAction} from './bgaction.model';


@Injectable({
  providedIn: 'root'
})
export class BGActionsService {
  constructor(private bgActions: BGActions) {}

  addBGAction(description: string) {
    const bgAction = new BGAction(description, BGActionStatus.IN_PROCESS, Date.now(), 0, null);
    this.bgActions.addBGProcess(bgAction);
    return bgAction;
  }

  updateActionFail(action: BGAction, error: string) {
    action.status = BGActionStatus.FAILED;
    action.endTime = Date.now();
    action.error = error;
  }

  updateActionSuccess(action: BGAction) {
    action.status = BGActionStatus.SUCCESS;
    action.endTime = Date.now();
  }
}
