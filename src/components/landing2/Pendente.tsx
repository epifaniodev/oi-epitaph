/**
 * Marcador de informação em falta.
 *
 * Existe para que um facto por preencher apareça à vista na página em vez de
 * passar despercebido. Não é decoração: enquanto estiver visível, a página não
 * está pronta a publicar.
 */
export function Pendente({ children }: { children: React.ReactNode }) {
  return (
    <mark className="pend">
      <span className="pend-tag">Pendente</span>
      {children}
    </mark>
  );
}
