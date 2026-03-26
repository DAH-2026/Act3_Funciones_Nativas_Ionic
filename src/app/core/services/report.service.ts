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

  async loadReportsFromStorage() {
    const result = await Preferences.get({ key: this.storageKey });
    if (result.value) {
      try {
        const parsed = JSON.parse(result.value) as Report[];
        this._reports.set(parsed);
      } catch {
        // Si hay error de parseo, no hacer nada
      }
    }
  }

  /**
   * Captura foto y geolocalización y deja el reporte en la señal `currentReport`
   * sin persistir. Esto permite al usuario revisar antes de confirmar (submit).
   */
  async captureReportDraft(): Promise<void> {
    const photo = await Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (!photo.webPath)
      throw new Error('Could not obtain the URI of the captured photo.');

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    const draftReport: Report = {
      id: globalThis.crypto?.randomUUID?.() ?? Date.now().toString(),
      photoUri: photo.webPath,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      createdAt: new Date().toISOString(),
    };

    this._currentReport.set(draftReport);
  }

  /**
   * Persiste el `currentReport` en el almacenamiento y lo añade
   * al arreglo de reports. Limpia el `currentReport` tras guardar.
   */
  async saveCurrentReport(): Promise<void> {
    const current = this._currentReport();
    if (!current) throw new Error('There is no current report to save.');

    const updatedReports = [current, ...this._reports()];

    this._reports.set(updatedReports);

    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(updatedReports),
    });

    this._currentReport.set(null);
  }
}
