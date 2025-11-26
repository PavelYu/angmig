import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true
    }
  ]
})
export class DateRangePickerComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Select date range';
  @Input() disabled = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Output() dateRangeChange = new EventEmitter<DateRange>();

  range = new FormGroup({
    start: new FormControl<Moment | null>(null),
    end: new FormControl<Moment | null>(null)
  });

  private onChange = (value: DateRange) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.range.valueChanges.subscribe(value => {
      const dateRange: DateRange = {
        start: value.start ? value.start.toDate() : null,
        end: value.end ? value.end.toDate() : null
      };
      this.onChange(dateRange);
      this.dateRangeChange.emit(dateRange);
    });
  }

  writeValue(value: DateRange): void {
    if (value) {
      this.range.patchValue({
        start: value.start ? moment(value.start) : null,
        end: value.end ? moment(value.end) : null
      }, { emitEvent: false });
    } else {
      this.range.patchValue({
        start: null,
        end: null
      }, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: DateRange) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.range.disable();
    } else {
      this.range.enable();
    }
  }

  clearRange(): void {
    this.range.patchValue({
      start: null,
      end: null
    });
  }
}

