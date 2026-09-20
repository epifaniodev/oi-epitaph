import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Revela o bloco quando entra no ecrã.
 *
 * O `transitionDelay` escalonado do original (`i % 6 * 60ms`) era aplicado em
 * ordem de documento; aqui o atraso deriva da posição do bloco na sua secção,
 * para que os cartões de uma grelha entrem em cascata e não todos ao mesmo
 * tempo.
 *
 * `prefers-reduced-motion` é tratado no CSS (a animação é desligada e o
 * `opacity` forçado a 1), por isso o bloco fica visível mesmo que o observer
 * nunca dispare.
 */
export function Reveal({
  as: Tag = "div",
  index = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  index?: number;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const delay = `${Math.min(index % 6, 5) * 60}ms`;

  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      style={{ transitionDelay: delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
