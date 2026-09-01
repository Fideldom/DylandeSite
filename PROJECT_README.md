# DYLANDE — Website corporativo

Este pacote contém a implementação frontend do website corporativo da **DYLANDE Prestação de Serviços Comércio Geral**, construído em React + Vite + Tailwind CSS. A experiência segue a direcção visual **Navy Precision**, com narrativa editorial, navy profundo, azul atlântico, tipografia Space Grotesk / DM Sans / IBM Plex Mono e uma linguagem de sinais técnicos.

## Executar localmente

Na raiz do projecto, instalar as dependências e iniciar o servidor de desenvolvimento:

```bash
pnpm install
pnpm dev
```

Para validar os tipos e gerar a build de produção:

```bash
pnpm check
pnpm build
```

## Estrutura principal

| Local | Conteúdo |
| --- | --- |
| `client/src/pages/Home.tsx` | Landing page completa, dados editáveis, navegação, filtros, formulário e CTAs |
| `client/src/index.css` | Tokens, identidade visual, layout responsivo e animações |
| `client/index.html` | Metadados, idioma, título e favicon DYLANDE |
| `ideas.md` | Direcção visual e decisões de design |
| `package.json` | Dependências e scripts do projecto |

## Pontos a personalizar

Os contactos apresentados são placeholders estruturados para substituição: `geral@dylande.com`, `+244 900 000 000` e `Luanda, Angola`. O número do WhatsApp está centralizado nos links `https://wa.me/244900000000` em `Home.tsx`.

O bloco de software está marcado como catálogo demonstrativo porque ainda não foram fornecidos produtos comerciais reais. Os números da faixa de estatísticas, os projectos do portefólio e os textos de serviço ficam em arrays no topo de `Home.tsx` para edição directa.

Não foram inventados testemunhos ou avaliações de clientes. A página está pronta para receber conteúdo real quando a empresa o disponibilizar.

## Assets visuais

Os assets visuais estão incluídos localmente em `client/public/assets`, para funcionarem no computador do utilizador e em qualquer hospedagem estática:

| Uso | URL |
| --- | --- |
| Hero tecnológico | `/assets/dylande-hero.webp` |
| Imagem institucional | `/assets/dylande-team.webp` |
| Mockup de software | `/assets/dylande-dashboard.webp` |
| Símbolo / favicon | `/assets/dylande-mark.webp` |

## Notas de implementação

A navegação usa âncoras internas, o menu mobile abre e fecha sem dependências adicionais, os filtros do portefólio são funcionais e o formulário apresenta feedback local através de toast. O formulário usa um fallback `mailto:` funcional sem backend. Para guardar leads automaticamente, ligue-o posteriormente a um endpoint ou serviço de formulários.

## Reconstrução multipágina DYLANDE

A versão actual organiza a experiência em `Empresa`, `Serviços`, `Soluções`, `Software`, `Certificações` e `Contacto`, com layout partilhado em `client/src/components/SiteLayout.tsx`. Os materiais enviados estão em `client/public/media`: logotipo, cinco imagens, dois vídeos, dois certificados AGT e o guia visual UX/UI.

A homepage usa os materiais reais do pacote, o software é apresentado em seis frentes — Faturação e Stock, Restauração, Hotelaria e Restauração, Lavandaria, Barbearia e Oficina — e os certificados têm acesso aos PDFs originais. O comando de verificação é `pnpm check`; a build frontend é `pnpm build:client`.

## Atualização — DYLANDE Motion System

Esta versão recebeu uma camada de experiência Enterprise baseada no briefing de motion typography:

- `client/src/components/Motion.tsx` — componentes de reveal, fill, mask, drift, blur, outline, split e transições.
- `client/src/components/WhatsAppButton.tsx` — CTA flutuante global com mensagem contextual.
- `SiteLayout.tsx` — transição suave entre rotas e WhatsApp global.
- `PageIntro` — títulos de abertura com variantes de movimento por página.
- `index.css` — microinterações, hover, profundidade, motion typography, WhatsApp responsivo e reduced-motion.
- Home — hero com transição cinematográfica, motion de headline e reveals em secções.

Variantes aplicadas: Serviços = mask, Software = fill/scroll fill, Soluções = letter drift, Empresa = blur-to-sharp, Certificações = outline-to-solid e Contacto = split typography.

O número de WhatsApp utilizado continua centralizado em `client/src/lib/siteConfig.ts` e atualmente está configurado como `244940000000`, conforme o contacto comercial presente no projeto original.

> Para executar a validação/build, instalar as dependências com o gestor de pacotes indicado no `package.json` e executar `pnpm check` e `pnpm build`. O ambiente de edição desta entrega não tinha `pnpm`/dependências instaladas, por isso a build não pôde ser executada localmente nesta sessão.
