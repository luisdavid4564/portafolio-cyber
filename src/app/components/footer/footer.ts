import { Component } from '@angular/core';
import {
  siAngular,
  siBurpsuite,
  siCypress,
  siGreensock,
  siJsonwebtokens,
  siKalilinux,
  siLaravel,
  siLinux,
  siMetasploit,
  siMysql,
  siOpenjdk,
  siPython,
  siWireshark,
} from 'simple-icons';

interface StackTechnology {
  nombre: string;
  path: string | null;
}

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly stack: StackTechnology[] = [
    { nombre: 'LARAVEL', path: siLaravel.path },
    { nombre: 'ANGULAR', path: siAngular.path },
    { nombre: 'MYSQL', path: siMysql.path },
    { nombre: 'SQL', path: null },
    { nombre: 'PYTHON', path: siPython.path },
    { nombre: 'JAVA', path: siOpenjdk.path },
    { nombre: 'CYPRESS', path: siCypress.path },
    { nombre: 'POWER BI', path: null },
    { nombre: 'JWT', path: siJsonwebtokens.path },
    { nombre: 'SPATIE', path: null },
    { nombre: 'GSAP', path: siGreensock.path },
    { nombre: 'KALI LINUX', path: siKalilinux.path },
    { nombre: 'LINUX', path: siLinux.path },
    { nombre: 'NMAP', path: null },
    { nombre: 'BURP SUITE', path: siBurpsuite.path },
    { nombre: 'METASPLOIT', path: siMetasploit.path },
    { nombre: 'WIRESHARK', path: siWireshark.path },
  ];
}
