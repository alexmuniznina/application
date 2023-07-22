import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

const SharedModules = [CommonModule, MaterialModule, RouterModule];

const SharedComponents = [ToolbarComponent];

@NgModule({
  declarations: [SharedComponents],
  imports: [SharedModules],
  exports: [SharedModules, SharedComponents],
})
export class SharedModule {}
