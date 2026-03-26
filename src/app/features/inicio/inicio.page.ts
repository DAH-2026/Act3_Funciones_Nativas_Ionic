import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    IonCard,
    IonCardContent,
  ],
})
export class InicioPage {
  private readonly router = inject(Router);

  irANuevaIncidencia(): void {
    this.router.navigate(['/alta']);
  }

  irAListado(): void {
    this.router.navigate(['/listado']);
  }
}
