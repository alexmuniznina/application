import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';

const SharedModules = [CommonModule, MaterialModule, RouterModule];

const SharedComponents = [ToolbarComponent];

@NgModule({
  declarations: [SharedComponents],
  imports: [SharedModules],
  exports: [SharedModules, SharedComponents],
})
export class SharedModule {}
