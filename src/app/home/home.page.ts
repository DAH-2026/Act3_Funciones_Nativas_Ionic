import { Component, OnInit } from '@angular/core';
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
}
