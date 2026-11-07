import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StackSkill {
  name: string;
  value: number;
}

@Component({
  imports: [],
  selector: 'app-contacto',
  styleUrl: './contacto.scss',
  templateUrl: './contacto.html',
})
export class Contacto implements AfterViewInit, OnDestroy {
  @ViewChild('stack') private stack!: ElementRef<HTMLElement>;

  protected readonly stackSkills: StackSkill[] = [
    { name: 'LARAVEL', value: 85 },
    { name: 'ANGULAR', value: 80 },
    { name: 'MYSQL', value: 75 },
    { name: 'TESTING', value: 70 },
  ];

  private animationContext?: gsap.Context;

  ngAfterViewInit(): void {
    if (
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    this.animationContext = gsap.context(() => {
      gsap.fromTo(
        '.contacto__bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: this.stack.nativeElement,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, this.stack.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
