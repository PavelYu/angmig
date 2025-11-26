import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-builder',
  template: `
    <div class="report-builder">
      <h2>Generate Report</h2>
      <form [formGroup]="reportForm" (ngSubmit)="generate()">
        <div class="form-row">
          <mat-form-field>
            <mat-label>Report Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="financial">Financial Summary</mat-option>
              <mat-option value="usage">User Activity</mat-option>
              <mat-option value="audit">Audit Log</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Date Range</mat-label>
            <mat-date-range-input [rangePicker]="picker">
              <input matStartDate formControlName="start" placeholder="Start date">
              <input matEndDate formControlName="end" placeholder="End date">
            </mat-date-range-input>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-date-range-picker #picker></mat-date-range-picker>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-checkbox formControlName="includeCharts">Include Charts</mat-checkbox>
          <mat-checkbox formControlName="exportPdf">Export as PDF</mat-checkbox>
        </div>

        <button mat-raised-button color="accent" type="submit">Generate Report</button>
      </form>
    </div>
  `,
  styles: [`
    .report-builder { padding: 20px; background: white; border-radius: 4px; }
    .form-row { display: flex; gap: 20px; margin-bottom: 20px; align-items: center; }
  `]
})
export class ReportBuilderComponent {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      type: ['financial'],
      start: [new Date()],
      end: [new Date()],
      includeCharts: [true],
      exportPdf: [false]
    });
  }

  generate() {
    console.log('Generating report...', this.reportForm.value);
  }
}
