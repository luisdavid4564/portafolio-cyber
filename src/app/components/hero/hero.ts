import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('titleLine') private titleLines!: QueryList<ElementRef<HTMLElement>>;

  protected currentTime = '';
  protected readonly gridCells = this.createGridCells();
  protected readonly open = signal(false);

  private readonly limaTimeFormatter = new Intl.DateTimeFormat('es-PE', {
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Lima',
  });
  private clockInterval?: ReturnType<typeof setInterval>;
  private readonly previousScrollMargins = new Map<HTMLElement, string>();
  private previousBodyPaddingBottom = '';
  private previousBodyOverflow = '';

  ngOnInit(): void {
    this.updateLimaTime();
    this.clockInterval = setInterval(() => this.updateLimaTime(), 1000);
    this.previousBodyPaddingBottom = document.body.style.paddingBottom;
    document.body.style.paddingBottom = '36px';
    window.addEventListener('resize', this.updateAnchorScrollMargins);
  }

  ngAfterViewInit(): void {
    this.updateAnchorScrollMargins();
    const lines = this.titleLines.map(({ nativeElement }) => nativeElement);

    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        clearProps: 'transform',
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.13,
        yPercent: 0,
      },
    );
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
    window.removeEventListener('resize', this.updateAnchorScrollMargins);
    document.body.style.paddingBottom = this.previousBodyPaddingBottom;
    document.body.style.overflow = this.previousBodyOverflow;

    for (const [element, margin] of this.previousScrollMargins) {
      element.style.scrollMarginTop = margin;
    }
  }

  protected toggleMenu(): void {
    if (this.open()) {
      this.closeMenu();
      return;
    }

    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.open.set(true);
  }

  protected closeMenu(): void {
    this.open.set(false);
    document.body.style.overflow = this.previousBodyOverflow;
  }

  private readonly updateAnchorScrollMargins = (): void => {
    const header = document.querySelector<HTMLElement>('.hero__header');

    if (!header) {
      return;
    }

    for (const id of ['inicio', 'work', 'about', 'stack', 'contacto']) {
      const element = document.getElementById(id);

      if (!element) {
        continue;
      }

      if (!this.previousScrollMargins.has(element)) {
        this.previousScrollMargins.set(element, element.style.scrollMarginTop);
      }

      element.style.scrollMarginTop = `${header.offsetHeight}px`;
    }
  }

  private updateLimaTime(): void {
    this.currentTime = this.limaTimeFormatter.format(new Date());
  }

  private createGridCells(): { color: string; opacity: number }[] {
    const accentCells = new Set([52, 53, 54, 64, 65, 66, 76, 77, 78]);
    const limeCells = new Set([91, 92, 93, 103, 104, 105]);

    return Array.from({ length: 144 }, (_, index) => {
      if (accentCells.has(index)) {
        return { color: 'var(--accent)', opacity: 1 };
      }

      if (limeCells.has(index)) {
        return { color: 'var(--lime)', opacity: 1 };
      }

      return { color: 'var(--ink)', opacity: Math.random() * 0.82 + 0.08 };
    });
  }
}
