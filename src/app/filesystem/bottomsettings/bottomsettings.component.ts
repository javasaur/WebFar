import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';

import { MainService } from '../../globalservices/main.service';
import { IAppState } from '../../store/IAppState';

@Component({
  selector: 'app-bottomsettings',
  templateUrl: './bottomsettings.component.html',
  styleUrls: ['./bottomsettings.component.scss', '../../themes/classic.scss', '../../themes/dark.scss', '../../themes/clumsy.scss']
})
export class BottomsettingsComponent implements OnInit, OnDestroy {
  openFilesOption: string
  activeTheme: string;
  subscription: any
  @Output('openBGScreen') openBGScreenEmitter = new EventEmitter<void>();

  constructor(private mainService: MainService,
              private store: Store<IAppState>) {
    this.subscription = store.select(state => state).subscribe(s => {
      this.activeTheme = s['app']['activeTheme'];
      this.openFilesOption = s['app']['openFilesOption'];
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeFileHandleOption() {
    this.mainService.changeFileHandleOption();
  }

  openBGScreen() {
    this.openBGScreenEmitter.emit();
  }
}
