import { Component, Input, SimpleChange } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ToolbarService } from 'src/app/services/toolbar/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() inputSidenav: MatSidenav;
  public isEnabled: boolean;

  constructor(private toolbarService: ToolbarService) {}

  ngOnInit() {
    this.toolbarService.getEnabled().subscribe((enabled) => {
      this.isEnabled = enabled;
    });
  }
}
