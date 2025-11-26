import { Component, Input, Output, EventEmitter, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

export interface StepperStep {
  label: string;
  description?: string;
  icon?: string;
  formGroup: FormGroup;
  optional?: boolean;
}

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss']
})
export class StepperFormComponent implements OnInit {
  @Input() steps: StepperStep[] = [];
  @Input() linear = true;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() stepChange = new EventEmitter<{ index: number; step: StepperStep }>();

  @ViewChildren(MatStepper) stepper!: QueryList<MatStepper>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.steps.length === 0) {
      // Create default steps if none provided
      this.steps = [
        {
          label: 'Step 1',
          description: 'Basic Information',
          formGroup: this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
          })
        },
        {
          label: 'Step 2',
          description: 'Additional Details',
          formGroup: this.fb.group({
            phone: [''],
            address: ['']
          })
        },
        {
          label: 'Step 3',
          description: 'Review',
          formGroup: this.fb.group({}),
          optional: true
        }
      ];
    }
  }

  isStepValid(index: number): boolean {
    const step = this.steps[index];
    return step.formGroup.valid || step.optional === true;
  }

  onStepChange(event: any): void {
    const index = event.selectedIndex;
    this.stepChange.emit({ index, step: this.steps[index] });
  }

  onSubmit(): void {
    // Collect all form values
    const formData = this.steps.reduce((acc, step) => {
      return { ...acc, ...step.formGroup.value };
    }, {});

    this.formSubmit.emit(formData);
  }

  goToStep(index: number): void {
    if (this.stepper.first) {
      this.stepper.first.selectedIndex = index;
    }
  }

  nextStep(): void {
    if (this.stepper.first) {
      this.stepper.first.next();
    }
  }

  previousStep(): void {
    if (this.stepper.first) {
      this.stepper.first.previous();
    }
  }

  getControlNames(formGroup: FormGroup): string[] {
    return Object.keys(formGroup.controls);
  }

  formatLabel(controlName: string): string {
    return controlName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  getInputType(controlName: string): string {
    if (controlName.toLowerCase().includes('email')) return 'email';
    if (controlName.toLowerCase().includes('phone')) return 'tel';
    if (controlName.toLowerCase().includes('password')) return 'password';
    return 'text';
  }
}

