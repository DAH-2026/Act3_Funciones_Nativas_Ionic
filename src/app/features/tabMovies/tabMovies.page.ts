import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonList,
  IonChip,
  IonThumbnail,
  IonImg,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronForward,
  filmOutline,
  heart,
  imageOutline,
  searchOutline,
  star,
} from 'ionicons/icons';
import { Movie } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-tabMovies',
  templateUrl: 'tabMovies.page.html',
  styleUrls: ['tabMovies.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonChip,
    IonButton,
    IonThumbnail,
    IonImg,
  ],
})
export class TabMoviesPage implements OnInit {
  // Inyección del servicio de rutas para navegación
  private router = inject(Router);

  // Inyección del servicio de películas para acceder a datos y métodos relacionados
  public movieService = inject(MovieService);

  // Signal reactivo para almacenar la consulta de búsqueda actual
  public searchQuery = signal('');

  // Signal reactivo para almacenar la última consulta enviada
  public submittedQuery = signal('');

  // Signal reactivo que indica si el usuario ya realizó una búsqueda
  public hasSearched = signal(false);

  // Inicializa los íconos de Ionicons al cargar el componente
  ngOnInit(): void {
    addIcons({
      filmOutline,
      heart,
      searchOutline,
      chevronForward,
      imageOutline,
      star,
    });
  }

  /**
   * Maneja el evento de entrada en el searchbar y actualiza la señal searchQuery
   * @param event Evento de entrada del searchbar
   */
  onQueryInput(event: CustomEvent): void {
    const target = event.target as HTMLIonSearchbarElement;
    this.searchQuery.set((target.value ?? '').toString());
  }

  /**
   * Al seleccionar una película, la guarda como actual y navega a la página de detalle
   * @param movie Película seleccionada
   */
  onSelectMovie(movie: Movie): void {
    this.movieService.setCurrentMovie(movie);
    this.router.navigate(['/detail-movie', movie.imdbID]);
  }

  /**
   * Verifica si la película tiene un póster válido
   * @param movie Película a verificar
   * @returns true si tiene póster, false si no
   */
  hasPoster(movie: Movie): boolean {
    return !!movie.Poster && movie.Poster !== 'N/A';
  }

  /**
   * Formatea el tipo de película (ej: movie, series) con la primera letra en mayúscula
   * @param value Tipo de película
   * @returns Tipo formateado o 'N/A' si no existe
   */
  formatType(value: string): string {
    // Versión compacta usando operador ternario
    return value
      ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      : 'N/A';
  }

  /**
   * Devuelve el rating de la película o 'N/A' si no está disponible
   * @param movie Película a mostrar rating
   * @returns Rating como string
   */
  displayItemRating(movie: Movie): string {
    return movie.imdbRating && movie.imdbRating !== 'N/A'
      ? movie.imdbRating
      : 'N/A';
  }

  /**
   * Realiza la búsqueda de películas usando el servicio y actualiza los signals relacionados
   * Solo busca si la consulta no está vacía
   */
  searchMovies(): void {
    const query = this.searchQuery().trim();

    if (query) {
      this.hasSearched.set(true);
      this.submittedQuery.set(query);
      this.movieService.searchMovies(query);
    }
  }
}
