import { Component, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'siscom-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnChanges {
  @Input()
  public isOpen: boolean;

  @Output()
  public isOpenChange: EventEmitter<boolean>;

  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  constructor() {
    this.isOpen = false;
    this.isOpenChange = new EventEmitter<boolean>();
  }

  public ngOnChanges(): void {
    if (this.isOpen) {
      this.sidenav.open();
    }
  }

  public close(): void {
    this.sidenav.close().then(() => {
      this.isOpen = false;
      this.isOpenChange.emit(this.isOpen);
    });
  }
}
