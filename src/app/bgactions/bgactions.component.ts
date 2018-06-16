import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BGAction} from './bgaction.model';
import {BGActionsService} from './bgactions.service';
import {select} from '@angular-redux/store';

@Component({
  selector: 'app-bgactions',
  templateUrl: './bgactions.component.html',
  styleUrls: ['./bgactions.component.scss', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})
export class BgactionsComponent implements OnInit {
  @select() activeTheme;
  activeTheme$: string;
  @select() bgActions;
  bgActions$: BGAction[];
  @Output() closeBGScreen = new EventEmitter<void>();

  constructor(private bgActionService: BGActionsService) {
  }

  ngOnInit() {
    const sub1 = this.activeTheme.subscribe((theme) => this.activeTheme$ = theme);
    const sub2 = this.bgActions.subscribe((actions) => this.bgActions$ = actions);
  }

  close() {
    this.closeBGScreen.emit();
  }
}
