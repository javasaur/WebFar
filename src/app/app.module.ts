import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouteReuseStrategy } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BgactionsComponent } from './bgactions/bgactions.component';
import { BottomsettingsComponent } from './filesystem/bottomsettings/bottomsettings.component';
import { CustomRouteReuseStrategy } from './utils/CustomRouteReuseStrategy';
import { ErrorComponent } from './error/error.component';
import { FileeditorComponent } from './filesystem/fileeditor/fileeditor.component';
import { FilelistComponent } from './filesystem/filelist/filelist.component';
import { MainScreenComponent } from './filesystem/mainscreen/mainscreen.component';
import { mainReducer } from './store/store';


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
    StoreModule.forRoot({app: mainReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [{
   provide: RouteReuseStrategy,
   useClass: CustomRouteReuseStrategy
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}
}
