import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimePickerComponent),
            multi: true
        }
    ],
    standalone: false
})
export class TimePickerComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Select time';
  @Input() format = 'HH:mm';
  @Input() disabled = false;
  @Input() showSeconds = false;
  @Output() timeChange = new EventEmitter<string>();

  timeControl = new FormControl('');
  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.timeControl.valueChanges.subscribe(value => {
      if (value) {
        this.onChange(value);
        this.timeChange.emit(value);
      }
    });
  }

  writeValue(value: string): void {
    if (value) {
      const time = moment(value, this.format);
      this.timeControl.setValue(time.format(this.format), { emitEvent: false });
    } else {
      this.timeControl.setValue('', { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.timeControl.disable();
    } else {
      this.timeControl.enable();
    }
  }
}

