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
import { Dialog } from '@capacitor/dialog';

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

  // Muestra un diálogo nativo (simulado): no guarda nada.
  public async mostrarDialog(): Promise<void> {
    const { value } = await Dialog.confirm({
      title: 'Guardar Incidencia',
      message:
        '¿Deseas simular el guardado de esta incidencia? (no se guardará)',
      okButtonTitle: 'Sí',
      cancelButtonTitle: 'No',
    });

    if (value) {
      await Dialog.alert({
        title: 'Simulación',
        message: 'Se simuló el guardado (no se guardó en preferencias).',
      });
    } else {
      await Dialog.alert({
        title: 'Cancelado',
        message: 'Operación cancelada (no se guardó).',
      });
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
