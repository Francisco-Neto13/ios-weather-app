# Weather App

<div align="center">
  <img src="./public/weather.ico" width="120" alt="Weather App Logo" style="border-radius: 24px">
  <p>Uma aplicação de clima com interface pixel-perfect inspirada no iPhone, pensada para unir fidelidade visual, dados em tempo real e uma experiência mobile-first refinada.</p>
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

## Visão Geral do Projeto

Este projeto foi desenvolvido como uma atividade da disciplina de **Interface Humano Computador (IHC)**. A proposta principal era reproduzir, com o maior nível possível de fidelidade visual, uma interface **pixel-perfect** baseada em um modelo da comunidade no Figma, mas substituindo os dados estáticos por **dados reais de clima**.

Além da integração com a API, o projeto também recebeu alguns **ajustes visuais e funcionais próprios** para melhorar a experiência de uso, adaptar o comportamento a cenários reais e deixar a interface mais consistente durante a navegação, busca e atualização de localização.

## Referência Visual

A direção visual do projeto foi baseada neste modelo da comunidade no Figma:

- Figma Community: https://www.figma.com/community/file/1100826294536456295

O objetivo deste repositório é transformar essa referência visual em uma aplicação funcional, integrada com API real, comportamento responsivo e estados interativos de uso.

## Destaques Técnicos

- **Integração com dados meteorológicos reais:** Clima atual, forecast, qualidade do ar, geocoding e reverse geocoding são consumidos a partir da OpenWeather.
- **Sistema de preview na busca:** Os resultados de pesquisa recebem dados de clima em cache para exibir informações mais completas antes da seleção final.
- **Geolocalização do dispositivo:** O app pode identificar a localização atual do usuário e atualizar o estado de clima com base nessa posição.
- **Persistência local de uso:** Locais salvos e previews de clima permanecem armazenados em `localStorage`, mantendo continuidade entre recarregamentos.
- **Escala responsiva do frame principal:** O layout central inspirado em iPhone se adapta a diferentes monitores sem depender do zoom manual do navegador.
- **Arquitetura refatorada de lógica:** Busca, persistência, formatação, previsão e composição de estado foram separados em hooks e módulos utilitários para melhorar manutenção e clareza do código.

## Stack Tecnológica

- **Framework principal:** React 19 com Vite 7
- **Linguagem:** JavaScript
- **Estilização:** Tailwind CSS 4
- **Fonte de dados:** OpenWeather API
- **Deploy:** Vercel

## API Utilizada

- OpenWeather: https://openweathermap.org/api

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

Observações importantes:

- Como o projeto utiliza Vite, a variável precisa começar com `VITE_`.
- Sempre que criar ou alterar o `.env`, reinicie o servidor local.
- A chave pode ficar fora do Git se o `.env` estiver ignorado, mas não fica totalmente secreta no navegador, porque a arquitetura atual é 100% frontend.
- Para esconder a chave de verdade, seria necessário mover as requisições da OpenWeather para um backend ou função serverless.

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o ambiente local:

```bash
npm run dev
```

Comandos úteis de validação:

```bash
npm run build
npm run lint
```

## Escopo Funcional

- renderização de clima atual em tempo real
- exibição de previsão por hora
- exibição de previsão de 5 dias, alinhada ao retorno atual da OpenWeather
- busca de cidades com geocoding
- previews meteorológicos na lista de pesquisa
- seleção da localização atual do dispositivo
- persistência de locais recentes
- interface inspirada em iOS com estados e camadas visuais refinadas

## Estrutura do Projeto

- `src/components` componentes visuais da interface
- `src/hooks` hooks responsáveis por busca, persistência e orquestração do clima
- `src/lib` utilitários de formatação, mapeamento e composição de dados
- `src/services` camada de integração com a API
- `public` assets visuais estáticos, como imagens, ícones, widgets e favicon

## Deploy

O projeto está publicado na Vercel:

- https://ios-weather-app.vercel.app/

Para produção, garanta que a variável abaixo esteja configurada no ambiente:

- `VITE_OPENWEATHER_API_KEY`

Se algum asset visual não aparecer em produção, o primeiro ponto a verificar é se ele está sendo servido a partir da pasta `public` com caminho absoluto, por exemplo `/images/house.png`.

---

<div align="center">
  <p>Construído com foco em fidelidade visual, dados reais e uma experiência mobile de alta qualidade.</p>
</div>
