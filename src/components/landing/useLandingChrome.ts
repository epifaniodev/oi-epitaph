import { useEffect, useRef, useState } from "react";

/**
 * Comportamento partilhado das landings: topbar sólida, menu mobile e CTA fixo.
 *
 * Vive aqui, e não dentro de cada página, porque as duas ofertas usam
 * exatamente o mesmo comportamento — só muda a copy. Duplicá-lo obrigaria a
 * corrigir cada bug de scroll duas vezes.
 */
export function useLandingChrome() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  /* Topbar sólida depois de o hero sair do ecrã. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => setStuck(!entry?.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
      threshold: 0,
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  /* CTA fixo: aparece depois do hero e desaparece enquanto a oferta está no
     ecrã — sobre a oferta seria ruído, é para lá que ele leva. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting), {
      threshold: 0,
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const offer = offerRef.current;
    if (!offer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOfferVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0 },
    );
    obs.observe(offer);
    return () => obs.disconnect();
  }, []);

  /* Escape fecha o menu mobile, senão ficava aberto por cima do conteúdo sem
     forma de o dispensar pelo teclado. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuBtnRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return {
    stuck,
    menuOpen,
    setMenuOpen,
    heroRef,
    offerRef,
    menuBtnRef,
    stickyOn: pastHero && !offerVisible,
  };
}
