import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import QwikLogo from "~/components/qwik-logo";

export default component$(() => {
  return (
    <section>
      <h1>Tus películas con</h1>
      <QwikLogo />
      <Link class="link" href="/movies" title="Ir a las pelis">
        Ver las pelis
      </Link>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Pelis con Qwik",
  meta: [
    {
      name: "description",
      content: "Es una app para buscar pelis en una API",
    },
  ],
};
