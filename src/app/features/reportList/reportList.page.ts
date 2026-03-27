import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonImg,
  IonBackButton,
  IonButtons,
  IonButton,
  IonModal,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Toast } from '@capacitor/toast';
import { NavController } from '@ionic/angular';
import { ReportService } from '../../core/services/report.service';
import { computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './reportList.page.html',
  styleUrls: ['./reportList.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonImg,
    IonBackButton,
    IonButtons,
    IonButton,
    IonModal,
  ],
})
export class ReportListPage {
  private reportService = inject(ReportService);
  private navCtrl = inject(NavController);
  goToAddReport() {
    this.navCtrl.navigateForward(['/add']);
  }

  constructor() {
    this.reportService.loadReportsFromStorage();
  }

  // Modal state con Angular Signal
  private _showConfirmModal = signal(false);
  public showConfirmModal = this._showConfirmModal.asReadonly();

  onClearReports() {
    this._showConfirmModal.set(true);
  }

  async confirmClearReports() {
    await this.reportService.clearAllReports();
    this._showConfirmModal.set(false);
  }

  cancelClearReports() {
    this._showConfirmModal.set(false);
  }

  onModalDismiss(event: any) {
    this._showConfirmModal.set(false);
  }

  private staticReports = [
    {
      id: '1',
      title: 'Streetlight broken',
      details: 'Light fixture not working on main avenue.',
      photoUri:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuApcseT1Bowk31LlhrbHgver0gecLcDIrfUQ11Wdd7vfgGEIoIwFPJTleWFU5s2uK-sJK3LAiydA6zWS9BFEiqNDacHreMHjUA57BVIhTf4BDhiPTSb5k2Q303jJO43qBr9xyKPUNQ7QVhfZ92dxMoDoc1PXSGP3Msbt9WqFlb_EnEY6A90yTLXr6fp70qXnhecfhLaDEeZqW2reTZWpdXLsiE6oHsVaA925C7hbha3neERbH4PLrBQUd3JoyRkSZRVr-9TQtCBQkE',
      latitude: 0,
      longitude: 0,
      createdAt: '2023-10-23',
    },
    {
      id: '2',
      title: 'Pothole on road',
      details: 'Pavement damage in front of central park.',
      photoUri:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCvlDQj1CiyR-iHJcfAwDGLiV6eWYhcd7rcoa8cqZS7WNkERpR0dp-KgDfXftF_pKGb61q0SuFZy4J7-Jf3IBLcz1F7iWtPiPK9LMLDlCdQz5s3mJKiipDcetrWttoTOXpGB_oym0JIkWvsOMcPAloWkcK245jCjdaPSMCr32N922AWaiMdvuNfbynYyN2EKY2kVYP0up4qNMwp_Adq2rE7NRPZGbSQngd_rRzjAD0N6zMzj1WWf3g_ENqgpZaKhOnrsFNz1OjZePU',
      latitude: 0,
      longitude: 0,
      createdAt: '2023-10-22',
    },
    {
      id: '3',
      title: 'Damaged bin',
      details: 'Trash bin with broken lid in residential area.',
      photoUri:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDgvkU85WJTYMzURs4gE_Z0jB3EQE-arcPOqiO8iw29zNgEbQN9dhWbeaWJ_A3sw78SiyAhCWuIRgw71fdcyXNR_6OYItsr5xOGAtQeXFVNYNqLUcjPkjtr9awM3sL2jMSxFlP_-pptdEtUXcKr0bNvBTDy_fO3C1YQlUZD2iL7GAeXLbGlGeDqeASaLriwxb3A0r4t082ap7fMTIvHcGXe2HR9W1fTWnUuDzLdCER43p-sOkOeYw8-4jYnKN3mMal7zIOkTR_64PU',
      latitude: 0,
      longitude: 0,
      createdAt: '2023-10-21',
    },
  ];

  public allReports: Signal<any[]> = computed(() => [
    ...this.staticReports,
    ...this.reportService.reports(),
  ]);

  async showUnderConstructionMessage(): Promise<void> {
    await Toast.show({
      text: 'Under construction',
      duration: 'short',
      position: 'bottom',
    });
  }
}
