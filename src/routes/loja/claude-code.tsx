import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Alias. A landing vive em `/claude-code` (é esse o URL que já circula e está
 * na barra lateral), mas `/loja/claude-code` é o URL que alguém tentaria por
 * analogia com as outras secções da loja. Redireciona em vez de servir a mesma
 * página em dois sítios — conteúdo duplicado, dois URLs a competir no índice.
 */
export const Route = createFileRoute("/loja/claude-code")({
  beforeLoad: () => {
    throw redirect({ to: "/claude-code", statusCode: 301 });
  },
});
