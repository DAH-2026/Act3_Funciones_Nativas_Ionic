import { Component, inject, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { IncidenciasService } from '../../core/services/incidencias.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  ],
})
export class ListadoPage {
  private readonly incidenciasService = inject(IncidenciasService);
  private readonly toastController = inject(ToastController);

  readonly incidenciasPrueba = signal([
    {
      id: '1',
      titulo: 'Farola averiada',
      detalle: 'Luminaria sin funcionamiento en avenida principal.',
    },
    {
      id: '2',
      titulo: 'Bache en calzada',
      detalle: 'Desperfecto de pavimento frente al parque central.',
    },
    {
      id: '3',
      titulo: 'Contenedor dañado',
      detalle: 'Contenedor con tapa rota en zona residencial.',
    },
  ]);

  async mostrarMensajeEnConstruccion(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'En construccion',
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
