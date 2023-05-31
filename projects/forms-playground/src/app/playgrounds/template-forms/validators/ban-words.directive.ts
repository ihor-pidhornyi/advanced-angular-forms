import {Directive, forwardRef, Input, Provider} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appBanWords]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: BanWordsDirective,
    multi: true
  }],
  standalone: true
})
export class BanWordsDirective implements Validator {

  @Input() public set appBanWords(value: string | string[]) {
    this.bannedWords = Array.isArray(value) ? value : [value]
    this.onChange()
  }

  private bannedWords: string[] = []

  private onChange: () => void = () => {}

  constructor() {
  }

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const foundBannedWord = this.bannedWords.find(word => word.toLowerCase() === control.value?.toLowerCase())
    if (!foundBannedWord) return null
    return { appBanWords: { bannedWord: foundBannedWord } };
  }

  registerOnValidatorChange(fn: () => void) {
    this.onChange = fn
  }

}
