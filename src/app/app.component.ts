import { Component, ViewChild, ViewContainerRef  } from '@angular/core';
import { AddonService } from './addon.service';
import { Router,Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing-library';

  @ViewChild('view', { read: ViewContainerRef })
  view: ViewContainerRef;
  constructor(private addonService: AddonService, public routes: Router) {
  }

  load() {
    this.addonService.loadAddon('http://localhost:5000/dist/lin-app1/bundles/lin-app1.umd.js').then(cmpRef => {
        this.view.clear();
        this.view.insert(cmpRef.hostView);
    });
  }
}