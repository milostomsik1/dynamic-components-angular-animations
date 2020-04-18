import {
  Component, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy,
  ElementRef, ViewChild, AfterViewInit, HostBinding, HostListener
} from '@angular/core';
import { trigger, style, animate, transition, query, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ backgroundColor: 'rgba(0, 0, 0, 0)' }),
        group([
          animate(500, style({ backgroundColor: 'rgba(0, 0, 0, 0.5)' })),
          query('@slideInOut', animateChild())
        ])
      ]),
      transition(':leave', [
        style({ backgroundColor: 'rgba(0, 0, 0, 0.5)' }),
        group([
          animate(500, style({ backgroundColor: 'rgba(0, 0, 0, 0)' })),
          query('@slideInOut', animateChild())
        ])
      ]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(250, style({ transform: 'translateX(-100%)' })),
      ])
    ])
  ]
})
export class SidenavComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') content: ElementRef<HTMLElement>;
  @Output() closed = new EventEmitter();

  @HostBinding('@overlay')
  get overlay() { return; }

  @HostListener('click', ['$event'])
  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.content.nativeElement);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy', this.content.nativeElement);
  }
}
