import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {routes} from './app/app-routing';
import {AppComponent} from './app/app.component';

import {environment} from './environments/environment';
import {HttpClientModule} from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), HttpClientModule)
  ]
})
  .catch(err => console.error(err));
