import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, OMDbDetailResponse, OMDbResponse } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private readonly API_URL = `https://www.omdbapi.com/?apikey=${environment.apiKeyOMDb}`;

  private _movies = signal<Movie[]>([]);
  public movies = this._movies.asReadonly();

  private _isSearching = signal(false);
  public isSearching = this._isSearching.asReadonly();

  private _currentMovie = signal<Movie | null>(null);
  public currentMovie = this._currentMovie.asReadonly();

  private _favorites = signal<Movie[]>([]);
  public favorites = this._favorites.asReadonly();

  public totalResults = computed(() => this._movies().length);
  public favoritesCount = computed(() => this._favorites().length);

  searchMovies(title: string): void {
    const query = title.trim();

    if (!query) return;

    // Mientras se realiza la búsqueda, se activa el indicador de carga que se mostrará en la interfaz de usuario
    this._isSearching.set(true);

    // Realiza búsquedas en las primeras 3 páginas de resultados para obtener hasta 30 películas
    forkJoin([1, 2, 3].map((page) => this.searchPage(query, page)))
      .pipe(
        map((pages) => {
          const merged = pages.reduce(
            (acc, currentPage) => acc.concat(currentPage),
            [] as Movie[],
          );
          const deduped = new Map<string, Movie>();

          // Elimina duplicados
          for (const movie of merged) deduped.set(movie.imdbID, movie);

          return Array.from(deduped.values());
        }),
        // Llamamos movies al return anterior con las pelis
        switchMap((movies) => {
          if (!movies.length) return of([] as Movie[]);

          //El campo imdbRating no viene en la respuesta de la búsqueda general. Por eso, por cada película obtenida, hacemos una nueva petición para obtener su detalle y extraer su rating.
          return forkJoin(
            movies.map((movie) =>
              this.fetchRating(movie.imdbID).pipe(
                map((imdbRating) => ({
                  ...movie,
                  imdbRating,
                })),
              ),
            ),
          );
        }),
        catchError(() => of([] as Movie[])),
        finalize(() => this._isSearching.set(false)),
      )
      .subscribe((movies) => {
        this._movies.set(movies);
      });
  }

  setCurrentMovie(movie: Movie): void {
    this._currentMovie.set(movie);
  }

  getMovieDetails(id: string): void {
    const imdbID = id.trim();

    if (!imdbID) return;

    // Realizamos petición en detalle -i
    this.http
      .get<OMDbDetailResponse>(
        `${this.API_URL}&i=${encodeURIComponent(imdbID)}`,
      )
      .subscribe((response) => {
        this._currentMovie.set(response.Response === 'True' ? response : null);
      });
  }

  toggleFavorite(movie: Movie): void {
    const exists = this._favorites().some((fav) => fav.imdbID === movie.imdbID);

    if (exists) {
      this._favorites.set(
        this._favorites().filter((fav) => fav.imdbID !== movie.imdbID),
      );
      return;
    }

    this._favorites.set([...this._favorites(), movie]);
  }

  isFavorite(imdbID: string): boolean {
    return this._favorites().some((fav) => fav.imdbID === imdbID);
  }

  private fetchRating(imdbID: string) {
    // Realizamos petición en detalle -i
    return this.http
      .get<OMDbDetailResponse>(
        `${this.API_URL}&i=${encodeURIComponent(imdbID)}`,
      )
      .pipe(
        map((response) => {
          if (response.Response === 'True' && response.imdbRating) {
            return response.imdbRating;
          }

          return 'N/A';
        }),
        catchError(() => of('N/A')),
      );
  }

  private searchPage(query: string, page: number) {
    //Busca una lista de peliculas por numero de pagina
    return this.http
      .get<OMDbResponse>(
        `${this.API_URL}&s=${encodeURIComponent(query)}&page=${page}`,
      )
      .pipe(
        map((response) => {
          if (response.Response === 'True' && response.Search) {
            return response.Search;
          }

          return [] as Movie[];
        }),
        catchError(() => of([] as Movie[])),
      );
  }
}
