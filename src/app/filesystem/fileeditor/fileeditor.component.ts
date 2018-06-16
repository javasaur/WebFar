import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Buffer } from 'buffer';
import { IAppState } from '../../store/IAppState';
import { MainService } from '../../globalservices/main.service';

@Component({
  selector: 'app-fileeditor',
  templateUrl: './fileeditor.component.html',
  styleUrls: ['./fileeditor.component.scss', '../../themes/classic.scss', '../../themes/dark.scss', '../../themes/clumsy.scss']
})
export class FileeditorComponent implements OnInit, OnDestroy {
  content: any;
  parent = '';
  filename: string;
  activeTheme: string;
  subscriptions = [];

  constructor(private _router: Router,
              private route: ActivatedRoute,
              private mainService: MainService,
              private store: Store<IAppState>) {}

  ngOnInit() {
    const sub1 = this.store.select(state => state).subscribe(s => this.activeTheme = s['app']['activeTheme']);

    const sub2 = this.route.queryParams.subscribe((params) => {
      this.filename = params.path; // temporary
      this.mainService.getContentOfFile(params.path).then((data: any) => {
        const buffer = JSON.parse(data.content).data;
        this.content = Buffer.from(buffer).toString('utf8').replace(/\n/g, '<br />');
      });
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  disableEditorMode() {
    this.mainService.toggleEditorMode();
  }
}
