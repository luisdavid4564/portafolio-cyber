import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  imports: [],
  selector: 'app-principios',
  styleUrl: './principios.scss',
  templateUrl: './principios.html',
})
export class Principios implements AfterViewInit, OnDestroy {
  private animationContext?: gsap.Context;

  ngAfterViewInit(): void {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      gsap.fromTo(
        '.principios__item',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.principios',
            start: 'top 80%',
            once: true,
          },
        },
      );
    });
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
