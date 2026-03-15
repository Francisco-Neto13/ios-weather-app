# Weather App

<div align="center">
  <img src="./public/weather.ico" width="120" alt="Weather App Logo" style="border-radius: 24px">
  <p>Uma aplicação de clima com interface inspirada no iPhone, focada em fidelidade visual, dados reais e experiência mobile-first.</p>
  <a href="https://ios-weather-app.vercel.app/"><strong>Acessar Aplicação</strong></a>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000">
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/OpenWeather-EB6E4B?style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

---

## Visão Geral

Este projeto foi desenvolvido como atividade da disciplina de **Interface Humano Computador (IHC)**. A proposta foi reproduzir uma interface pixel-perfect baseada em um modelo da comunidade no Figma, substituindo dados estáticos por dados meteorológicos reais.

## Referência Visual

- Figma Community: https://www.figma.com/community/file/1100826294536456295

## Destaques Técnicos

- Integração com dados meteorológicos reais da OpenWeather
- Busca de cidades com geocoding e reverse geocoding
- Geolocalização do dispositivo
- Persistência local de locais salvos e previews
- Estrutura de hooks e utilitários para separar busca, persistência e composição de estado
- Chave da OpenWeather protegida no servidor via função serverless

## Stack

- React 19 com Vite 7
- JavaScript
- Tailwind CSS 4
- OpenWeather API
- Vercel

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
OPENWEATHER_API_KEY=sua_chave_aqui
```

Observações importantes:

- Sempre que criar ou alterar o `.env`, reinicie o servidor local.
- A chave fica fora do Git porque o `.env` está ignorado.
- As chamadas para a OpenWeather passam por `/api/openweather`.
- A chave é lida apenas no servidor, então não vai para o bundle do navegador.

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o ambiente local:

```bash
npm run dev
```

Comandos úteis:

```bash
npm run build
npm run lint
```

## Escopo Funcional

- clima atual em tempo real
- previsão por hora
- previsão de 5 dias
- busca de cidades
- previews meteorológicos na busca
- uso da localização atual do dispositivo
- persistência de locais recentes

## Estrutura

- `src/components`: componentes visuais da interface
- `src/hooks`: hooks de busca, persistência e orquestração
- `src/lib`: utilitários de formatação e transformação de dados
- `src/services`: camada cliente que conversa com `/api/openweather`
- `api`: funções serverless usadas no deploy da Vercel
- `server`: utilitários server-side compartilhados entre Vercel e `vite dev`

## Deploy

O projeto está publicado na Vercel:

- https://ios-weather-app.vercel.app/

Para produção, configure esta variável no ambiente da Vercel:

- `OPENWEATHER_API_KEY`

Se algum asset visual não aparecer em produção, verifique se ele está sendo servido a partir da pasta `public` com caminho absoluto, por exemplo `/images/house.png`.

---

<div align="center">
  <p>Construído com foco em fidelidade visual, dados reais e uma experiência mobile de alta qualidade.</p>
</div>
