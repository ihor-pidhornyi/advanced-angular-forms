import {Directive, ElementRef, HostListener, Renderer2, SecurityContext} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

const DEFAULT_REVIEW_TEMPLATE = `
  <h4 data-placeholder="Text..."></h4>
  <p data-placeholder="Describe Your Experience..."></p>
`

@Directive({
  selector: '[formControlName][contenteditable],[formControl][contenteditable],[ngModel][contenteditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableContentValueAccessor,
      multi: true
    }
  ],
  standalone: true
})
export class EditableContentValueAccessor implements ControlValueAccessor {

  private onChange!: (newValue: string) => void;
  private onTouch!: () => void;

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    this.onChange((e.target as HTMLElement).innerHTML)
  }
  @HostListener('blur')
  onBlur() {
    this.onTouch()
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private sanitizer: DomSanitizer) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  writeValue(obj: any): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.sanitizer.sanitize(SecurityContext.HTML, obj) || DEFAULT_REVIEW_TEMPLATE
    )
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'contentEditable', !isDisabled)
  }

}
