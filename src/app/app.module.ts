import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { INITIAL_STATE, rootReducer } from './store/state/store';
import { AppComponent } from './app.component';
import { FilelistComponent } from './filelist/filelist.component';
import { IAppState } from './store/state/IAppState';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { FsComponent } from './fs/fs.component';
import { CustomRouteReuseStrategy } from './utils/CustomRouteReuseStrategy';
import { FileeditorComponent } from './fileeditor/fileeditor.component';
import { BottomsettingsComponent } from './bottomsettings/bottomsettings.component';
import { BgactionsComponent } from './bgactions/bgactions.component';

@NgModule({
  declarations: [
    AppComponent,
    FilelistComponent,
    ErrorComponent,
    FsComponent,
    FileeditorComponent,
    BottomsettingsComponent,
    BgactionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgReduxModule,
    AppRoutingModule,
  ],
  providers: [{
   provide: RouteReuseStrategy,
   useClass: CustomRouteReuseStrategy
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(store: NgRedux<IAppState>) {
    store.configureStore(rootReducer, INITIAL_STATE);
  }
}
