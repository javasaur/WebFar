import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

defineCustomFunctions();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

function defineCustomFunctions() {
  Object.defineProperty(Array.prototype, 'getNextIndexOrFirst', {
    enumerable: false,
    value: function(nextIndex) {
      return nextIndex >= this.length ? 0 : nextIndex;
    }
  });
}
