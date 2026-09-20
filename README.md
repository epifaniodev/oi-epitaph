# Marketplace Axye · oi-epitaph

Loja e landing do Claude Code na Prática. TanStack Start (React 19 + Vite +
Tailwind v4), com o catálogo servido a partir da API Axye.

| Rota | Página |
|---|---|
| `/` · `/loja` | Catálogo completo |
| `/loja/$seccao` | Catálogo filtrado (`proxies`, `claude`, `emails`, `bm`, …) |
| `/loja/claude-code` | Alias → 301 para `/claude-code` |
| `/claude-code` | Landing "Claude Code na Prática" |
| `/tutorial` · `/suporte` | Ajuda |

## Arrancar

```bash
npm install
npm run dev
```

A loja precisa de `AXYE_API_KEY` no ambiente. **A configuração do servidor, o
segredo e o deploy estão em [INSTRUCTION.md](./INSTRUCTION.md)** — é por aí que
se começa.

## Como está organizado

```
src/
  routes/            rotas (file-based; routeTree.gen.ts é gerado)
  components/store/  loja: grelha, cartão, barra lateral, painel de detalhe
  components/landing/ landing: secções, reveal ao scroll, FAQ, checkout
  lib/axye.ts        cliente da API (a chave fica do lado do servidor)
  lib/catalog.functions.ts  server functions que a loja consome
  lib/categories.ts  categorias heurísticas + barra lateral (lógica pura)
```

### Duas folhas de estilo, uma por página

A loja (escura) e a landing (creme) definem as **mesmas variáveis CSS em valores
opostos** (`--bg`, `--ink`, `--muted`, `--accent`…). Por isso cada rota declara a
sua folha em `head().links` e nenhuma página carrega as duas:

| Página | Folha |
|---|---|
| Loja | `/styles.css` |
| Landing | `/claude-code/landing.css` |

Ambas vivem em `public/` e são servidas tal como estão — sem passo de build, sem
PostCSS. Se um dia forem movidas para `src/` e importadas, o pipeline do Tailwind
(`source(none)`) e o autoprefixer entram ao de cima e alteram-nas.

## Verificação

```bash
npx tsc --noEmit     # tipos
npm run build        # build (Cloudflare Workers por omissão)
npm run lint
```

Antes de publicar, confirmar que a chave não foi parar ao bundle do cliente:

```bash
grep -r "alup_live" .output/public
```

Deve sair vazio.

## Pendências

Ver a secção final de [INSTRUCTION.md](./INSTRUCTION.md): as quatro URLs de
checkout continuam por preencher, há um preço inconsistente entre a landing
(R$ 75) e o produto no catálogo (R$ 49,90), e o `og:image` precisa de URL
absoluto quando o domínio estiver definido.
