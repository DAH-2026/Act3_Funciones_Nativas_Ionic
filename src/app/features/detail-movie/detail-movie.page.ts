import { Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonCol,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  filmOutline,
  heartDislikeOutline,
  heartOutline,
  imageOutline,
  star,
} from 'ionicons/icons';
import { Movie } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonIcon,
    IonImg,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
})
export class DetailMoviePage implements OnInit {
  private route = inject(ActivatedRoute);
  public movieService = inject(MovieService);

  public isFavorite = computed(() => {
    const movie = this.movieService.currentMovie();
    return movie ? this.movieService.isFavorite(movie.imdbID) : false;
  });

  ngOnInit(): void {
    addIcons({
      arrowBackOutline,
      imageOutline,
      star,
      heartDislikeOutline,
      heartOutline,
      filmOutline,
    });

    const movieId = this.route.snapshot.paramMap.get('id');

    if (!movieId) return;

    const currentMovie = this.movieService.currentMovie();

    if (
      !currentMovie ||
      currentMovie.imdbID !== movieId ||
      !this.hasFullDetailData(currentMovie)
    ) {
      this.movieService.getMovieDetails(movieId);
    }
  }

  toggleFavorite(): void {
    const movie = this.movieService.currentMovie();
    if (movie) this.movieService.toggleFavorite(movie);
  }

  // Métodos para verificar y mostrar si la película tiene poster, género, rating, trama, etc.

  hasPoster(poster?: string): boolean {
    return !!poster && poster !== 'N/A';
  }

  displayGenre(movie: Movie): string {
    return movie.Genre && movie.Genre !== 'N/A' ? movie.Genre : 'No genre';
  }

  displayRating(rating?: string): string {
    return !rating || rating === 'N/A' ? 'N/A' : rating;
  }

  ratingProgress(rating?: string): number {
    const parsed = Number(rating);
    return Number.isFinite(parsed)
      ? Math.max(0, Math.min(100, parsed * 10))
      : 0;
  }

  hasPlot(plot?: string): boolean {
    return !!plot && plot !== 'N/A';
  }

  fallbackValue(value?: string): string {
    return !value || value === 'N/A' ? 'Not available' : value;
  }

  displayType(type?: string): string {
    return !type || type === 'N/A'
      ? 'N/A'
      : type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }

  private hasFullDetailData(movie: Movie): boolean {
    return !!(
      movie.Plot &&
      movie.Director &&
      movie.Actors &&
      movie.Genre &&
      movie.Runtime &&
      movie.imdbRating
    );
  }
}
