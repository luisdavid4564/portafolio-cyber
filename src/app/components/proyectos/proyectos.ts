import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Proyecto {
  nombre: string;
  categoria: string;
  imagen: string;
  imageAlt: string;
}

@Component({
  imports: [],
  selector: 'app-proyectos',
  styleUrl: './proyectos.scss',
  templateUrl: './proyectos.html',
})
export class Proyectos implements AfterViewInit, OnDestroy {
  @ViewChild('section') private section!: ElementRef<HTMLElement>;

  protected readonly proyectos: Proyecto[] = [
    {
      nombre: 'SISTEMA_CLINICO',
      categoria: 'GESTIÓN CLÍNICA',
      imagen: '/img/dash_clinica1.png',
      imageAlt: 'Vista del sistema de gestión clínica',
    },
    {
      nombre: 'COMPRA Y VENTA',
      categoria: 'PUNTO DE VENTA E INVENTARIO',
      imagen: '/img/compra-venta1.png',
      imageAlt: 'Vista del sistema de compra, venta e inventario',
    },
    {
      nombre: 'MIND_CHECK',
      categoria: 'ESTIMULACIÓN TEMPRANA',
      imagen: '/img/mundo-crece.png',
      imageAlt: 'Vista del proyecto Mundo Crece',
    },
    {
      nombre: 'INFO_ESTUDIANTIL',
      categoria: 'GESTIÓN ACADÉMICA',
      imagen: '/img/estudiantil.png',
      imageAlt: 'Vista del sistema de gestión académica',
    },
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
        '.proyectos__card',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: this.section.nativeElement,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, this.section.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
