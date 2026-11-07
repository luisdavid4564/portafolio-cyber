import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Principios } from './components/principios/principios';
import { Proyectos } from './components/proyectos/proyectos';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';

@Component({
  imports: [Hero, Principios, Proyectos, Contacto, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
