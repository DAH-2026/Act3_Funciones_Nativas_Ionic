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
  selector: 'app-home',
  templateUrl: './home.page.html',
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
export class HomePage {
  private readonly router = inject(Router);

  goToNewReport(): void {
    this.router.navigate(['/add']);
  }

  goToList(): void {
    this.router.navigate(['/report-list']);
  }
}
