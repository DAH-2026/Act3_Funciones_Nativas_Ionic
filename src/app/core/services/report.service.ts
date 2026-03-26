import { Injectable, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { Report } from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly storageKey = 'reports';

  //PREGUNTAR SI DEBE GUARDARSE AQUI TAMBIEN O CON PREFERENCES VALE
  private _reports = signal<Report[]>([]);
  public reports = this._reports.asReadonly();

  private _currentReport = signal<Report | null>(null);
  public currentReport = this._currentReport.asReadonly();

  //REVISAR ESTE METODO, QUE YO CREO QUE NO HACE FALTA
  async loadReports(): Promise<void> {
    const { value } = await Preferences.get({ key: this.storageKey });
    const reports = value ? (JSON.parse(value) as Report[]) : [];
    this._reports.set(reports);
    //this._currentReport.set(reports[0] ?? null);
    this._currentReport.set(null);
  }

  async captureAndSaveReport(): Promise<void> {
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

    const newReport: Report = {
      id: globalThis.crypto?.randomUUID?.() ?? Date.now().toString(),
      photoUri: photo.webPath,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      createdAt: new Date().toISOString(),
    };

    const updatedReports = [newReport, ...this._reports()];

    this._reports.set(updatedReports);
    this._currentReport.set(newReport);

    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(updatedReports),
    });
  }
}
