import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true
    }
  ]
})
export class ChipInputComponent implements ControlValueAccessor {
  @Input() placeholder = 'Add item...';
  @Input() separator = ',';
  @Input() removable = true;
  @Input() addOnBlur = true;
  @Input() maxChips?: number;
  @Output() chipAdded = new EventEmitter<string>();
  @Output() chipRemoved = new EventEmitter<string>();

  chips: string[] = [];
  inputControl = new FormControl('');
  disabled = false;

  private onChange = (value: string[]) => {};
  private onTouched = () => {};

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === this.separator) {
      event.preventDefault();
      this.addChip();
    } else if (event.key === 'Backspace' && !this.inputControl.value && this.chips.length > 0) {
      this.removeChip(this.chips.length - 1);
    }
  }

  onInputBlur(): void {
    if (this.addOnBlur && this.inputControl.value) {
      this.addChip();
    }
    this.onTouched();
  }

  addChip(): void {
    const value = this.inputControl.value?.trim();
    if (!value) return;

    // Check max chips limit
    if (this.maxChips && this.chips.length >= this.maxChips) {
      return;
    }

    // Avoid duplicates
    if (this.chips.includes(value)) {
      this.inputControl.setValue('');
      return;
    }

    this.chips.push(value);
    this.inputControl.setValue('');
    this.chipAdded.emit(value);
    this.onChange(this.chips);
  }

  removeChip(index: number): void {
    if (!this.removable || this.disabled) return;

    const removed = this.chips.splice(index, 1)[0];
    this.chipRemoved.emit(removed);
    this.onChange(this.chips);
  }

  // ControlValueAccessor implementation
  writeValue(value: string[]): void {
    this.chips = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }
}

