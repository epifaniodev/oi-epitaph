/** Dinheiro e estoque, partilhados pela loja. Portado de `public/app.js`. */

export function brl(cents: number | null | undefined): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((Number(cents) || 0) / 100);
}

export function stockClass(n: number | null | undefined): string {
  if (n === null || n === undefined) return "";
  if (n <= 0) return "out";
  if (n <= 5) return "low";
  return "";
}

export function stockLabel(n: number | null | undefined): string {
  if (n === null || n === undefined) return "Estoque —";
  if (n <= 0) return "Sem estoque";
  return `${n} em estoque`;
}
