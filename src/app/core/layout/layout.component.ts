import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, RouterState, Event, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'siscom-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public title: string;
  public isOpen: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.isOpen = false;
  }

  public ngOnInit(): void {
    this.router.events.pipe(filter((event: Event) => event instanceof RoutesRecognized)).subscribe((routesRecognized: RoutesRecognized) => {
      this.title = routesRecognized.state.root.firstChild.firstChild.data.title;
    });
  }

  public onMenuButtonClicked(): void {
    this.isOpen = true;
  }
}
