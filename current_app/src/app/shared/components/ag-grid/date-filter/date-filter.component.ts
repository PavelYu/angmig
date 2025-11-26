import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IFloatingFilterAngularComp } from 'ag-grid-angular';
import { IFloatingFilterParams, IDateFilterParams } from 'ag-grid-community';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements IFloatingFilterAngularComp, OnInit, AfterViewInit {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  
  params!: IFloatingFilterParams;
  dateFrom = new FormControl<Date | null>(null);
  dateTo = new FormControl<Date | null>(null);
  currentFilter: any = null;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize with existing filter if present
    if (this.params && this.params.currentParentModel) {
      const model = this.params.currentParentModel;
      if (model.dateFrom) {
        this.dateFrom.setValue(new Date(model.dateFrom));
      }
      if (model.dateTo) {
        this.dateTo.setValue(new Date(model.dateTo));
      }
    }
  }

  agInit(params: IFloatingFilterParams): void {
    this.params = params;
  }

  onParentModelChanged(parentModel: any): void {
    if (!parentModel) {
      this.dateFrom.setValue(null, { emitEvent: false });
      this.dateTo.setValue(null, { emitEvent: false });
    } else {
      if (parentModel.dateFrom) {
        this.dateFrom.setValue(new Date(parentModel.dateFrom), { emitEvent: false });
      }
      if (parentModel.dateTo) {
        this.dateTo.setValue(new Date(parentModel.dateTo), { emitEvent: false });
      }
    }
  }

  onDateFromChange(event: MatDatepickerInputEvent<Date>): void {
    const dateFrom = event.value;
    this.updateFilter(dateFrom, this.dateTo.value);
  }

  onDateToChange(event: MatDatepickerInputEvent<Date>): void {
    const dateTo = event.value;
    this.updateFilter(this.dateFrom.value, dateTo);
  }

  private updateFilter(dateFrom: Date | null, dateTo: Date | null): void {
    if (!dateFrom && !dateTo) {
      this.params.parentFilterInstance((instance: any) => {
        if (instance) {
          instance.setModel(null);
        }
      });
      return;
    }

    const filterModel: any = {};
    if (dateFrom) {
      filterModel.dateFrom = dateFrom.getTime();
    }
    if (dateTo) {
      filterModel.dateTo = dateTo.getTime();
    }

    this.params.parentFilterInstance((instance: any) => {
      if (instance) {
        instance.setModel(filterModel);
      }
    });
  }

  clearFilter(): void {
    this.dateFrom.setValue(null);
    this.dateTo.setValue(null);
    this.params.parentFilterInstance((instance: any) => {
      if (instance) {
        instance.setModel(null);
      }
    });
  }
}
