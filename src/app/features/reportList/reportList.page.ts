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
  selector: 'app-report-list',
  templateUrl: './reportList.page.html',
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
export class ReportListPage {
  private _sampleReports = signal([
    {
      id: '1',
      title: 'Streetlight broken',
      details: 'Light fixture not working on main avenue.',
    },
    {
      id: '2',
      title: 'Pothole on road',
      details: 'Pavement damage in front of central park.',
    },
    {
      id: '3',
      title: 'Damaged bin',
      details: 'Trash bin with broken lid in residential area.',
    },
  ]);
  public sampleReports = this._sampleReports.asReadonly();

  async showUnderConstructionMessage(): Promise<void> {
    await Toast.show({
      text: 'Under construction',
      duration: 'short',
      position: 'bottom',
    });
  }
}
