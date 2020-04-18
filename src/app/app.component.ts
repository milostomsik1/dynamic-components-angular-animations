import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private readonly sub = new Subscription();
  @ViewChild('sidenav', { read: ViewContainerRef }) sidenav: ViewContainerRef;

  constructor(
    private readonly injector: Injector,
    private readonly cfr: ComponentFactoryResolver,
  ) { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createSidenav(contentComponent: any) {
    // clear, only 1 sidenav at any time
    this.sidenav.clear();

    // ng-content
    const contentFactory = this.cfr.resolveComponentFactory(contentComponent);
    const content = contentFactory.create(this.injector);

    // sidenav
    const sidenavFactory = this.cfr.resolveComponentFactory(SidenavComponent);
    const sidenav = sidenavFactory.create(this.injector, [[content.location.nativeElement]]);

    // listen to sidenav output
    this.sub.add(sidenav.instance.closed.subscribe(() => this.clear()));

    // create sidenav component
    this.sidenav.insert(sidenav.hostView);
  }

  clear() {
    this.sidenav.clear();
  }

  showSidenav(contentName: string) {
    if (contentName === 'profile') {
      this.createSidenav(ProfileComponent);
    } else if (contentName === 'cart') {
      this.createSidenav(CartComponent);
    }
  }
}
