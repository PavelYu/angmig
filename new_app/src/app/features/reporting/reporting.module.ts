import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportBuilderComponent } from './components/report-builder/report-builder.component';
import { ReportViewerComponent } from './components/report-viewer/report-viewer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ReportBuilderComponent,
    ReportViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReportingModule { }
