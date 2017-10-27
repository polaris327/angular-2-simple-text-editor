import { Component, ViewChild, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { SignalsService } from './services/signals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  waiting = false;
  text = '';
  OKMessage = '';
  ErrorMessage = '';

  capitalWords = ['and', 'or'];
  boldWords = [
    'lower than', 'lower',
    'higher than', 'higher',
    'exponential moving average',
    'simple moving average',
    'moving average'
  ];
  highlightedWords: any = [
    { word: 'AND', highlight: 'blue' },
    { word: 'OR', highlight: 'blue' },
    { word: 'exponential moving average', highlight: 'green' },
    { word: 'simple moving average', highlight: 'orange' },
    { word: 'moving average', highlight: 'orange', ignoreIfLeft : ['exponential ', 'simple '] },
  ];

  constructor(private signalsService: SignalsService) {
  }

  onGet() {
    this.waiting = true;
    this.signalsService.get().subscribe(
      (data) => {
        this.waiting = false;
        this.text = data.content;
        this.onSucces();
      },
      (error) => {
        this.waiting = false;
        this.onError(error);
      }
    );
  }

  onSave() {
    this.waiting = true;
    this.signalsService.save(this.text).subscribe(
      (data) => {
        this.waiting = false;
        this.onSucces();
      },
      (error) => {
        this.waiting = false;
        this.onError(error);
      }
    );
  }

  onSucces() {
    this.OKMessage = 'Success! ';
    this.ErrorMessage = '';
  }

  onError(error) {
    this.ErrorMessage = 'An Error has ocurred, Please Retry. ' + JSON.parse(error._body).detail;
    this.OKMessage = '';
  }
}
