# Validação de interações

A entrada inicial mantém-se curta e discreta em desktop e mobile. O cabeçalho continua legível, com botão de tema e menu mobile sem sobreposição. O menu mobile usa opacity, visibility e translateY para abrir com uma transição curta sem remover o fluxo de teclado. O tracking opcional não faz pedidos nem produz erros quando as variáveis VITE_ANALYTICS_ENDPOINT e VITE_ANALYTICS_WEBSITE_ID não estão configuradas.

A validação de tipos e a build frontend foram concluídas com sucesso.

## Reconstrução multipágina — validação local

A pré-visualização local carregou correctamente em `/` e `/certificacoes`. A homepage mostra o hero com a fotografia real da campanha de faturação, navegação multipágina, CTAs, vídeo e catálogo de seis sectores. A página de certificações mostra os dois documentos AGT com números, datas, contexto, abertura e descarga dos PDFs locais.

A build `pnpm build:client` e a validação `pnpm check` concluíram com sucesso. Os assets reais estão em `client/public/media`, com nomes web-safe para os PDFs. O preview gerido do Manus apresentou erro de repositório após o reset da sandbox, por isso a verificação visual foi feita no preview Vite local em `http://localhost:4173`.

## Catálogo e contacto

A página `/software` carregou com os seis sectores, imagem real multi-dispositivo, vídeo e ligação para o guia visual UX/UI. A página `/contacto` carregou com formulário, select de solução, email, WhatsApp e localização. A navegação partilhada mantém-se consistente nas páginas.
