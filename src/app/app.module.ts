import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighlightTextDirective } from './highlight-text.directive';
import { TempDirective } from './temp.directive';

@NgModule({
  declarations: [
    AppComponent,
    HighlightTextDirective,
    TempDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
