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
import { IncidenciaPrueba } from '../../core/models/incidencia.model';
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

  readonly incidenciasPrueba = signal<IncidenciaPrueba[]>(
    this.incidenciasService.obtenerListadoPrueba(),
  );

  async mostrarMensajeEnConstruccion(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'En construccion',
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
