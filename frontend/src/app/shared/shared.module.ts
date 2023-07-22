import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

const SharedModules = [CommonModule, MaterialModule];

const SharedComponents = [ToolbarComponent];

@NgModule({
  declarations: [ToolbarComponent],
  imports: [SharedModules],
  exports: [SharedModules, SharedComponents],
})
export class SharedModule {}
