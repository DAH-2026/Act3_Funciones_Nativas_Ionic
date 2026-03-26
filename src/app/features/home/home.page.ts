import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonImg,
    IonMenuButton,
    IonButtons,
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
