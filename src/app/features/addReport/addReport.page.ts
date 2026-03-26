import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonImg,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Toast } from '@capacitor/toast';
import { ReportService } from '../../core/services/report.service';

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
    IonBackButton,
    IonButtons,
  ],
})
export class AddReportPage {
  public readonly reportService = inject(ReportService);

  public readonly currentReport = this.reportService.currentReport;

  async captureReport(): Promise<void> {
    try {
      await this.reportService.captureReportDraft();
      await this.showToast('Photo captured. Press Submit to save the report.');
    } catch {
      await this.showToast('Could not capture the report.');
    }
  }

  async saveReport(): Promise<void> {
    try {
      await this.reportService.saveCurrentReport();
      await this.showToast('Report submitted successfully.');
    } catch (err) {
      await this.showToast('Could not submit the report.');
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
