import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CapitilizeWordsDirective } from './directives/capitalize-words/capitilize-words.directive';
import { CustomTextAreaComponent } from './components/custom-text-area/custom-text-area.component';
import { SignalsService } from './services/signals.service';

@NgModule({
  declarations: [
    AppComponent,
    CapitilizeWordsDirective,
    CustomTextAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SignalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
