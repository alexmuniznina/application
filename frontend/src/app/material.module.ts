import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

const MaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatCardModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
];

@NgModule({
  declarations: [],
  imports: [MaterialModules],
  exports: [MaterialModules],
})
export class MaterialModule {}
