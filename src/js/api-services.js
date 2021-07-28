const API_KEY = 'b74c0dc966c6718b20701d7c34776374';
export default class ApiServices {
  constructor() {
    this.page = 1;
    this.query = '';
    this.movieId;
  }
  async fetchFindMovies() {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.query}&page=${this.page}`;
    this.updPage();
    const res = await fetch(URL);
    const obj = await res.json();
    return await obj.results;
  }
  async fetchDetailedMovie() {
    const URL = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(URL);
    const obj = await res.json();
    return await obj;
  }
  async fetchPopularMovies() {
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${this.page}`;
    this.updPage();
    const res = await fetch(URL);
    const obj = await res.json();
    return await obj.results;
  }
  async createPopMovieGenres() {
    const fetchPopMovies = await this.fetchPopularMovies();
    const fetchGenMovies = await this.fetchGenreMovies();
    const createGenres = fetchPopMovies.map(movie => ({
          ...movie,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'n/a',
          genres: movie.genre_ids
            ? movie.genre_ids
              .map(id => fetchGenMovies.filter(el => el.id === id))
              .slice(0, 2)
              .flat()
        : 'Other',
    }));
    return createGenres;
  }

  async fetchGenreMovies() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(URL);
    const obj = await res.json();
    return await obj.genres;
  }
  clearRes() {
    this.page = 1;
  }
  updPage() {
    this.page += 1;
  }

  set currentQuery(newQuery) {
    this.query = newQuery;
  }
  get currentQuery() {
    return this.query;
  }
  set currentId(newId) {
    this.movieId = newId;
  }
  get currentId() {
    return this.movieId;
  }
}
