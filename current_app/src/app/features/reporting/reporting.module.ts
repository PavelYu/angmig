import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportBuilderComponent } from './components/report-builder/report-builder.component';
import { ReportViewerComponent } from './components/report-viewer/report-viewer.component';



@NgModule({
  declarations: [
    ReportBuilderComponent,
    ReportViewerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportingModule { }
