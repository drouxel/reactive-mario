import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

/**
 * component that can be used to encapsulate tables or lists in order to have an infinite scroll
 * inspiration => https://medium.com/netanelbasal/build-an-infinite-scroll-component-in-angular-a9c16907a94d
 */
@Component({
  selector: 'app-infinite-scroll',
  imports: [],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('scrollBottom') scrollBottom!: ElementRef<HTMLElement>;

  private _observer!: IntersectionObserver;

  private _host: ElementRef = inject(ElementRef);
  get element() {
    return this._host.nativeElement;
  }

  public ngAfterViewInit(): void {
      const options = {
        root: null,
        ...this.options
      }

      this._observer = new IntersectionObserver(([entry]) => {
        entry.isIntersecting && this.scrolled.emit();
      }, options);
      this._observer.observe(this.scrollBottom.nativeElement)
  }

  public ngOnDestroy(): void {
      this._observer.disconnect();
  }
}
