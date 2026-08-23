import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

// Destinos oferecidos no lugar do beco sem saída — uma 404 que devolve o
// visitante ao funil vale mais do que um link solto para a home.
const DESTINOS = [
  { to: "/solucoes", label: "Soluções", desc: "As 5 áreas de atuação da VIEW" },
  { to: "/casos", label: "Casos de sucesso", desc: "Resultados reais de clientes" },
  { to: "/blog", label: "Blog", desc: "Conteúdo sobre processos e gestão" },
  {
    to: "/avaliacao-maturidade",
    label: "Avaliação de maturidade",
    desc: "Diagnóstico gratuito em 7 dimensões",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: rota inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Página não encontrada (404) | VIEW"
        description="A página que você procura não existe ou foi movida."
        path={location.pathname}
        noindex
      />
      <main className="flex min-h-screen items-center justify-center bg-muted px-6 py-16">
        <div className="w-full max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Erro 404
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Esta página não existe.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            O endereço pode ter mudado ou o link estar incorreto. Veja por onde
            continuar:
          </p>

          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {DESTINOS.map(({ to, label, desc }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block h-full rounded-lg border bg-background p-4 transition-colors hover:border-primary"
                >
                  <span className="font-semibold">{label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="mt-8 inline-block text-primary underline hover:text-primary/90"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
