import { Component, inject, signal } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { IncidenciasService } from '../../core/services/incidencias.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
  ],
})
export class AltaPage {
  private readonly incidenciasService = inject(IncidenciasService);
  private readonly toastController = inject(ToastController);

  readonly photoUri = signal<string | null>(null);
  readonly latitude = signal<number | null>(null);
  readonly longitude = signal<number | null>(null);

  async capturarIncidencia(): Promise<void> {
    try {
      const incidencia =
        await this.incidenciasService.crearIncidenciaDesdeCamara();
      this.photoUri.set(incidencia.photoUri);
      this.latitude.set(incidencia.latitude);
      this.longitude.set(incidencia.longitude);
      await this.mostrarToast('Incidencia guardada localmente.');
    } catch {
      await this.mostrarToast('No se pudo capturar la incidencia.');
    }
  }

  private async mostrarToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
