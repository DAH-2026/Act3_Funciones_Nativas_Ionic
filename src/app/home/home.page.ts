import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { camera } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
  ],
})
export class HomePage implements OnInit {
  public photo?: SafeResourceUrl;
  private sanitizer = inject(DomSanitizer);
  constructor() {
    addIcons({ camera });
  }

  public latitude?: number;
  public longitude?: number;
  public accuracy?: number;
  async ngOnInit() {
    await this.getLocation();
  }
  private async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.accuracy = position.coords.accuracy;
    } catch (error) {
      console.error('Error al obtener la geolocalización:', error);
    }
  }

  public async takePicture(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      if (image.webPath) {
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
          image.webPath,
        );
      }
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }
}
