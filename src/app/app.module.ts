import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilesComponent } from './files/files.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { FilelistingComponent } from './filelisting/filelisting.component';
import { OptionstatsComponent } from './optionstats/optionstats.component';
import { SumstatsComponent } from './sumstats/sumstats.component';
import { MenuheaderComponent } from './menuheader/menuheader.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    MainscreenComponent,
    FilelistingComponent,
    OptionstatsComponent,
    SumstatsComponent,
    MenuheaderComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
