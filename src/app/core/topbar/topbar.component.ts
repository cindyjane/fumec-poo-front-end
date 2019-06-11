import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'siscom-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Input()
  public title: string;

  @Output()
  public menuButtonClick: EventEmitter<void>;

  constructor() {
    this.menuButtonClick = new EventEmitter<void>();
  }

  public onMenuButtonClicked(): void {
    this.menuButtonClick.emit();
  }
}
