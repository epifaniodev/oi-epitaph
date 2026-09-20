import { useState } from "react";

import { Reveal } from "./Reveal";

export type Faq = { q: string; a: string };

/**
 * Perguntas frequentes — uma resposta aberta de cada vez.
 *
 * `<details>` nativo (funciona sem JS) com o `open` controlado: o original
 * ouvia o evento `toggle` e fechava os irmãos, mas isso obrigava a escrever no
 * DOM depois do browser já ter aberto o elemento. Controlado, o estado é a
 * única fonte de verdade e o `onClick` do `summary` decide antes de abrir.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <Reveal as="details" key={item.q} index={i} open={openIndex === i}>
          <summary
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setOpenIndex(openIndex === i ? null : i);
            }}
          >
            {item.q}
          </summary>
          <p>{item.a}</p>
        </Reveal>
      ))}
    </div>
  );
}
