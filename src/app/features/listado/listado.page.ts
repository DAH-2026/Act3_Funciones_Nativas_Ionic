import { Component, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Toast } from '@capacitor/toast';

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
  private _incidenciasPrueba = signal([
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
  public incidenciasPrueba = this._incidenciasPrueba.asReadonly();

  async mostrarMensajeEnConstruccion(): Promise<void> {
    await Toast.show({
      text: 'En construccion',
      duration: 'short',
      position: 'bottom',
    });
  }
}
