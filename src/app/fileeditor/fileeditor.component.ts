import {Component, OnDestroy, OnInit} from '@angular/core';
import { FilesService } from '../files/files.service';
import { Buffer } from 'buffer';
import { select } from '@angular-redux/store';
import {ActivatedRoute, Event, Router, RoutesRecognized} from '@angular/router';
import {FilesActions} from '../store/behavior/files.actions';

@Component({
  selector: 'app-fileeditor',
  templateUrl: './fileeditor.component.html',
  styleUrls: ['./fileeditor.component.css', '../themes/classic.scss', '../themes/dark.scss', '../themes/clumsy.scss']
})
export class FileeditorComponent implements OnInit, OnDestroy {
  content: any;
  parent = '';
  filename = 'general.txt';
  activeTheme$: string;
  @select() activeTheme;
  subscriptions = [];

  constructor(private filesService: FilesService,
              private _router: Router,
              private route: ActivatedRoute,
              private filesActions: FilesActions) {}

  ngOnInit() {
    console.log('initialized');
    const sub1 = this.activeTheme.subscribe((theme) => {
      this.activeTheme$ = theme;
    });

    const sub2 = this.route.queryParams.subscribe((params) => {
      console.log('here');
      this.filesService.getContentOfFile(params.path).then((data: any) => {
        const buffer = JSON.parse(data.content).data;
        this.content = Buffer.from(buffer).toString('utf8').replace(/\n/g, '<br />');
      });
    });

    this.subscriptions.push.apply(this.subscriptions, [sub1, sub2]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  disableEditorMode() {
    this.filesActions.toggleEditorMode();
  }
}
