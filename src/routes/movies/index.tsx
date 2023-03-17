import {
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead, Form, Link, routeAction$ } from "@builder.io/qwik-city";
import styles from "./style.css?inline";

const movieApikey = "3e78671a";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const useGetMovies = routeAction$(async (values) => {
  const url = `http://www.omdbapi.com/?apikey=${movieApikey}&s=${values.search}`;
  const res = await fetch(url);
  const data = await res.json();

  const list = data.Search as Movie[];

  return {
    movies: list,
  };
});

export default component$(() => {
  useStylesScoped$(styles);
  const defaultMovie = useSignal("batman");
  const movies = useGetMovies();

  useVisibleTask$(() => {
    document.querySelector("button")?.click();
  });

  return (
    <div class="grid">
      <header class="header">
        <Link href="/">Inicio</Link>
        <h1>Tu buscador de pelis favorito</h1>
        <Form class="header-form" action={movies}>
          <input
            class="header-input"
            name="search"
            type="text"
            value={defaultMovie.value}
          />
          <button class="link">Buscar peli</button>
        </Form>
      </header>
      <main class="main">
        {movies.value?.movies ? (
          <ul class="movies">
            {movies.value.movies.map((movie) => (
              <li key={movie.imdbID} class="movie">
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay pelis</p>
        )}
      </main>
      <footer class="footer">
        <p>Hecho con Qwik</p>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Busca tu peli con Qwik",
  meta: [
    {
      name: "description",
      content: "Es una app para buscar pelis en una API",
    },
  ],
};
