import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BgactionsComponent } from './bgactions/bgactions.component';
import { BottomsettingsComponent } from './filesystem/bottomsettings/bottomsettings.component';
import { CustomRouteReuseStrategy } from './utils/CustomRouteReuseStrategy';
import { ErrorComponent } from './error/error.component';
import { FileeditorComponent } from './filesystem/fileeditor/fileeditor.component';
import { FilelistComponent } from './filesystem/filelist/filelist.component';
import { IAppState } from './store/IAppState';
import { INITIAL_STATE, rootReducer } from './store/store';
import { MainScreenComponent } from './filesystem/mainscreen/mainscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    FilelistComponent,
    ErrorComponent,
    MainScreenComponent,
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
