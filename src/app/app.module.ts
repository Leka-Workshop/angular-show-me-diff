import { NgModule } from '@angular/core';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/javascript';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule, HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        themePath: 'node_modules/highlight.js/styles/github.css',
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          sql: () => import('highlight.js/lib/languages/sql'),
          vbnet: () => import('highlight.js/lib/languages/vbnet'),
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
