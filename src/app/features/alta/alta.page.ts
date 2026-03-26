import { Component, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Toast } from '@capacitor/toast';
import { IncidenciaService } from '../../core/services/incidencia.service';

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
  public readonly incidenciaService = inject(IncidenciaService);

  public readonly incidenciaActual = this.incidenciaService.incidenciaActual;

  constructor() {
    void this.incidenciaService.cargarIncidencias();
  }

  async capturarIncidencia(): Promise<void> {
    try {
      await this.incidenciaService.capturarYGuardarIncidencia();
      await this.mostrarToast('Incidencia guardada localmente.');
    } catch {
      await this.mostrarToast('No se pudo capturar la incidencia.');
    }
  }

  private async mostrarToast(message: string): Promise<void> {
    await Toast.show({
      text: message,
      duration: 'short',
      position: 'bottom',
    });
  }
}
