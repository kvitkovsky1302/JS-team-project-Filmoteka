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

//тестирование запросов

// const testApiFetch = new ApiServices();

// const btn = document.querySelector('.btn');
// btn.addEventListener('click', () => testApiFetch.fetchPopularMovies());

// import debounce from 'lodash.debounce';

// const findInput = document.querySelector('.inp');
// findInput.addEventListener(
//   'input',
//   debounce(e => {
//     testApiFetch.currentQuery = e.target.value;
//     testApiFetch.fetchFindMovies();
//   }, 1000),
// );
