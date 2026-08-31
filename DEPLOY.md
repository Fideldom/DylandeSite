# DYLANDE — Execução e Deploy

## 1. Preparar o computador

Instale o **Node.js LTS** a partir de [nodejs.org](https://nodejs.org/). Depois, abra o PowerShell dentro da pasta do projeto e confirme as versões:

```powershell
node --version
npm --version
```

Este projeto usa **pnpm**, porque o pacote inclui `pnpm-lock.yaml` e foi configurado para esse gestor de dependências. Instale-o uma vez:

```powershell
npm install -g pnpm@10.4.1
pnpm --version
```

## 2. Instalar e executar localmente

Extraia o ZIP, entre na pasta e instale as dependências:

```powershell
cd C:\Users\PC\Desktop\DylandeSite\dylande-corporate-site
pnpm install
pnpm dev
```

Abra o endereço mostrado no terminal. Neste projeto, o Vite está a usar normalmente `http://localhost:3000/`.

Se existir uma instalação incompleta anterior, limpe-a e repita:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
pnpm install
pnpm dev
```

## 3. Validar antes do deploy

```powershell
pnpm check
pnpm build:client
pnpm preview
```

A pasta estática criada pelo `build:client` é `dist/public`. O comando `pnpm build` também cria o bundle completo do projeto, mas para hospedagem frontend estática deve ser usado `pnpm build:client`.

## 4. Deploy no Manus

A opção mais simples é usar o projeto já criado no Manus. Guarde a versão com um checkpoint e, no painel do projeto, abra **Publish**. Escolha a visibilidade, confirme o domínio `manus.space` ou associe um domínio próprio nas definições de Domains.

Não é necessário executar `npm run dev` para publicar no Manus. O painel utiliza a versão guardada do projeto. O site agora usa os ficheiros locais em `client/public/assets`, por isso as imagens também ficam disponíveis no deploy.

## 5. Deploy em Vercel

Crie um projeto na [Vercel](https://vercel.com/) e importe o repositório do projeto. Configure os valores seguintes:

| Campo | Valor |
| --- | --- |
| Install Command | `pnpm install` |
| Build Command | `pnpm build:client` |
| Output Directory | `dist/public` |
| Framework Preset | Vite |

Se a Vercel perguntar pelo gestor de pacotes, selecione pnpm. Depois clique em Deploy.

## 6. Deploy em Netlify

Na [Netlify](https://www.netlify.com/), crie um novo site a partir do repositório e configure:

| Campo | Valor |
| --- | --- |
| Build command | `pnpm build:client` |
| Publish directory | `dist/public` |
| Node version | `22` |

O projeto é uma landing page com âncoras internas, portanto não precisa de uma regra adicional de routing para esta versão.

## 7. Deploy manual por ZIP

Depois de executar `pnpm build:client`, compacte apenas o conteúdo da pasta `dist/public` e envie-o para qualquer hospedagem de ficheiros estáticos. O servidor deve apontar o domínio para essa pasta publicada e servir `index.html` como página inicial.

## 8. Causa dos erros corrigida

Os avisos `%VITE_ANALYTICS_ENDPOINT% is not defined` e `Malformed URI sequence` eram provocados por um script de analytics do ambiente Manus que estava a ser carregado num computador local sem essas variáveis de ambiente. O script foi removido do `index.html` local.

As imagens não apareciam porque os caminhos `/manus-storage/...` só existem no ambiente Manus. Os assets foram convertidos para WebP leve e incluídos em `client/public/assets`. A aplicação agora usa caminhos portáveis como `/assets/dylande-hero.webp`, que funcionam localmente e no deploy.

## 9. Se preferir continuar com npm

É possível instalar ignorando o conflito de peer dependencies:

```powershell
npm install --legacy-peer-deps
npm run dev
```

Contudo, a recomendação continua a ser `pnpm install`, porque o lockfile e as configurações do projeto foram preparados para pnpm.
