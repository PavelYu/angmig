import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as moment from 'moment-timezone';

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

@Component({
  selector: 'app-timezone-selector',
  templateUrl: './timezone-selector.component.html',
  styleUrls: ['./timezone-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimezoneSelectorComponent),
      multi: true
    }
  ]
})
export class TimezoneSelectorComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = 'Select timezone';
  @Input() disabled = false;
  @Input() showCurrentTime = true;
  @Output() timezoneChange = new EventEmitter<string>();

  timezoneControl = new FormControl('');
  timezones: TimezoneOption[] = [];
  currentTime: string = '';

  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.loadTimezones();
    
    this.timezoneControl.valueChanges.subscribe(value => {
      if (value) {
        this.onChange(value);
        this.timezoneChange.emit(value);
        this.updateCurrentTime(value);
      }
    });

    // Update current time every minute
    setInterval(() => {
      if (this.timezoneControl.value) {
        this.updateCurrentTime(this.timezoneControl.value);
      }
    }, 60000);
  }

  private loadTimezones(): void {
    const commonTimezones = [
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'America/Phoenix',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Asia/Dubai',
      'Australia/Sydney',
      'UTC'
    ];

    this.timezones = commonTimezones.map(tz => {
      const momentTz = moment.tz(tz);
      return {
        value: tz,
        label: tz.replace('_', ' '),
        offset: momentTz.format('Z')
      };
    }).sort((a, b) => {
      // Sort by offset
      return a.offset.localeCompare(b.offset);
    });
  }

  private updateCurrentTime(timezone: string): void {
    if (this.showCurrentTime) {
      this.currentTime = moment.tz(timezone).format('YYYY-MM-DD HH:mm:ss z');
    }
  }

  writeValue(value: string): void {
    this.timezoneControl.setValue(value || '', { emitEvent: false });
    if (value) {
      this.updateCurrentTime(value);
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
      this.timezoneControl.disable();
    } else {
      this.timezoneControl.enable();
    }
  }
}

