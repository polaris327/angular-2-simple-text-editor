import { Component, ViewChild, OnInit, forwardRef, Renderer2, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_TEXT_AREA_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomTextAreaComponent),
    multi: true
};

@Component({
  selector: 'app-custom-text-area',
  templateUrl: './custom-text-area.component.html',
  styleUrls: ['./custom-text-area.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_TEXT_AREA_CONTROL_VALUE_ACCESSOR]
})
export class CustomTextAreaComponent implements ControlValueAccessor {

  // tslint:disable-next-line:no-input-rename
  @Input('value') _value = '';

  @Input() capitalWords = [];
  @Input() boldWords = [];
  @Input() highlightedWords: any = [];

  @ViewChild('container') container: ElementRef;
  @ViewChild('backdrop') backdrop: ElementRef;
  @ViewChild('highlights') highlights: ElementRef;
  @ViewChild('bolds') bolds: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;
  isIE: boolean;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    const usAg = window.navigator.userAgent.toLowerCase();
    this.isIE = !!usAg.match(/msie|trident\/7|edge/);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.onTextChange();
  }

  writeValue(value) {
    console.log(value);
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onTextChange() {
    const highlightedText = this.applyHighlights(this._value);
    this.renderer.setProperty(this.highlights.nativeElement, 'innerHTML', highlightedText);

    const boldText = this.applyBolds(this._value);
    this.renderer.setProperty(this.bolds.nativeElement, 'innerHTML', boldText);
  }

  onScroll() {
    const scrollTop = this.textarea.nativeElement.scrollTop;
    this.renderer.setProperty(this.backdrop.nativeElement, 'scrollTop', scrollTop);
    this.renderer.setProperty(this.highlights.nativeElement, 'scrollTop', scrollTop);
    this.renderer.setProperty(this.bolds.nativeElement, 'scrollTop', scrollTop);

    const scrollLeft = this.textarea.nativeElement.scrollLeft;
    this.renderer.setProperty(this.backdrop.nativeElement, 'scrollLeft', scrollLeft);
    this.renderer.setProperty(this.highlights.nativeElement, 'scrollLeft', scrollLeft);
    this.renderer.setProperty(this.bolds.nativeElement, 'scrollLeft', scrollLeft);
  }

  applyBolds(text) {
    text = text.replace(/\n$/g, '\n\n');

    this.boldWords.forEach(w => {
      const r = '\\b' + w + '\\b';
      const  search = new RegExp( r, 'gi');
      text  = text.replace(search, '<span>$&</span>');
    });

    if (this.isIE) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>');
    }

    return text;
  }

  applyHighlights(text) {
    text = text.replace(/\n$/g, '\n\n');

    this.highlightedWords.forEach(hw => {
      const r = '\\b' + hw.word + '\\b';
      const  search = new RegExp( r, 'gi');
      const replaceWith = '<span style="background-color:' + hw.highlight + '">' + hw.word + '</span>';

      if (hw.ignoreIfLeft && hw.ignoreIfLeft.length > 0) {
        const indexes = [];
        let match = null;
        while (match = search.exec(text)) {
          let include = true;
          hw.ignoreIfLeft.forEach(e => {
            const ignorePosition =  match.index - e.length;
            if (ignorePosition > 0) {
              const str = text.substring(ignorePosition, match.index);
              if ( str === e) {
                include = false;
              }
            }
          });
          if (include) {
            indexes.push(match.index);
          }
        }

        indexes.reverse().forEach( i => {
          text = text.substring(0, i) + replaceWith + text.substring(i + hw.word.length);
        });
      } else {
        text  = text.replace(search, replaceWith);
      }

    });

    if (this.isIE) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>');
    }

    return text;
  }
}
