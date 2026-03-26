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
import { CommonModule } from '@angular/common';
import { Toast } from '@capacitor/toast';
import { ReportService } from '../../core/services/report.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-add-report',
  templateUrl: './addReport.page.html',
  styleUrls: ['./addReport.page.scss'],
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
export class AddReportPage {
  public readonly reportService = inject(ReportService);

  public readonly currentReport = this.reportService.currentReport;

  constructor() {
    void this.reportService.loadReports();
  }

  async captureReport(): Promise<void> {
    try {
      await this.reportService.captureAndSaveReport();
      await this.showToast('Report saved locally.');
    } catch {
      await this.showToast('Could not capture the report.');
    }
  }

  // Muestra un diálogo nativo (simulado): no guarda nada.
  public async showDialog(): Promise<void> {
    const { value } = await Dialog.confirm({
      title: 'Save Report',
      message:
        'Do you want to simulate saving this report? (it will not be saved)',
      okButtonTitle: 'Yes',
      cancelButtonTitle: 'No',
    });

    if (value) {
      await Dialog.alert({
        title: 'Simulation',
        message: 'Save simulated (not stored in preferences).',
      });
    } else {
      await Dialog.alert({
        title: 'Canceled',
        message: 'Operation canceled (not saved).',
      });
    }
  }

  private async showToast(message: string): Promise<void> {
    await Toast.show({
      text: message,
      duration: 'short',
      position: 'bottom',
    });
  }
}
