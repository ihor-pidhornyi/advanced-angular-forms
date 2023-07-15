import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null

@Component({
  selector: 'cfc-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() value: RatingOptions = null

  @Input()
  disabled = false

  @Output() valueChange = new EventEmitter<RatingOptions>()

  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex = 0

  @HostListener('blur')
  onBlur() {
    this.onTouched()
  }

  private onChange: (newValue: RatingOptions) => void = () => {
  }
  private onTouched: () => void = () => {
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes) {
      this.onChange(changes['value'].currentValue)
    }
  }

  writeValue(obj: RatingOptions): void {
    this.value = obj
    this.cd.markForCheck()
  }

  registerOnChange(fn: (newValue: RatingOptions) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
    this.cd.markForCheck()
  }

  ngOnInit(): void {
  }

  public setValue(value: RatingOptions): void {
    if (this.disabled) return
    this.value = value
    this.valueChange.emit(this.value)
    this.onTouched()
    this.onChange(this.value)
  }

}
