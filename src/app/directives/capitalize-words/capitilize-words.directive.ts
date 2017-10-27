import { Directive, ElementRef, forwardRef, Renderer2, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

const UPPERCASE_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapitilizeWordsDirective),
  multi: true,
};

@Directive({
  selector: '[appCapitilizeWords]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(input)': 'onInput($event.target.value)'
  },
  providers: [
    UPPERCASE_INPUT_CONTROL_VALUE_ACCESSOR,
  ],
})
export class CapitilizeWordsDirective extends DefaultValueAccessor implements OnInit {
  @Input() words: string[] = [];

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false);
  }

  ngOnInit() {
    if (!this.words || !(this.words.length > 0) ) {
      this.words = [];
    }
  }

  writeValue(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
  }

  onInput(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
    this.onChange(transformed);
  }

  private transformValue(value: any): any {
    let result = value;

    if (value && typeof value === 'string') {
      this.words.forEach( w => {
        const r = '\\b' + w + '\\b';
        const  search = new RegExp( r, 'gi');
        result = result.replace(search, w.toUpperCase());
      });
    }

    return result;
  }

}
