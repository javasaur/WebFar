import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, INITIAL_STATE, rootReducer } from './store/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FilelistComponent } from './filelist/filelist.component';


@NgModule({
  declarations: [
    AppComponent,
    FilelistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
