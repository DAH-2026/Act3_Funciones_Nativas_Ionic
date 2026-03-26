import { Injectable, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { Incidencia } from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly storageKey = 'incidencias';

  private _incidencias = signal<Incidencia[]>([]);
  public incidencias = this._incidencias.asReadonly();

  private _incidenciaActual = signal<Incidencia | null>(null);
  public incidenciaActual = this._incidenciaActual.asReadonly();

  async cargarIncidencias(): Promise<void> {
    const { value } = await Preferences.get({ key: this.storageKey });
    const incidencias = value ? (JSON.parse(value) as Incidencia[]) : [];
    this._incidencias.set(incidencias);
    this._incidenciaActual.set(incidencias[0] ?? null);
  }

  async capturarYGuardarIncidencia(): Promise<void> {
    const photo = await Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (!photo.webPath) {
      throw new Error('No se pudo obtener la URI de la foto capturada.');
    }

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    const nuevaIncidencia: Incidencia = {
      id: globalThis.crypto?.randomUUID?.() ?? Date.now().toString(),
      photoUri: photo.webPath,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      createdAt: new Date().toISOString(),
    };

    const incidenciasActualizadas = [nuevaIncidencia, ...this._incidencias()];

    this._incidencias.set(incidenciasActualizadas);
    this._incidenciaActual.set(nuevaIncidencia);

    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(incidenciasActualizadas),
    });
  }
}
