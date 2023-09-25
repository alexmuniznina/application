import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DialogConfirmacaoComponent } from './dialog-confirmacao/dialog-confirmacao.component';

const SharedModules = [CommonModule, MaterialModule, RouterModule];

const SharedComponents = [ToolbarComponent, DialogConfirmacaoComponent];

@NgModule({
  declarations: [SharedComponents],
  imports: [SharedModules],
  exports: [SharedModules, SharedComponents],
})
export class SharedModule {}
