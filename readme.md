![ExGame logo](./doc/assets/ExGame%20logo.png)

# ExGame - applicazione per compiti in classe ed esami, ma più divertente

- [Consulta i requisiti](./doc/index.md)
- [Nomenclatura](./doc/nomenclatura.md)
- [Domain model](./doc/domain-model.md)
- [Design del database](./doc/database-model.md)

## Install

Questo progetto è un ["monorepo"](https://docs.npmjs.com/cli/v7/using-npm/workspaces) che contiene tre applicazioni:

- **backend**: applicazione server che contiene la business logic, realizzata utilizzando il framework node.js [Koa](https://koajs.com/). Questa applicazione gestisce il database (MongoDB) ed espone api al frontend
- **frontend**: single page application realizzata in [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) utilizzando lo scaffolding di [Vite](https://vite.dev/)
- **website**: sito web di presentazione del progetto, realizzato utilizzando [Next.js](https://nextjs.org/)

L'installazione di tutte le dipendenze si effettua lanciando il comando: `npm install` dalla directory principale del progetto.

### Connessione al database

Se hai un database Mongo attivo sulla tua macchina, usa quello. La connessione è impostata sui parametri di default `mongodb://localhost:27017/exgame`.

Se invece non hai un database attivo, ma hai Docker installato, puoi lanciare `docker compose up` da questa cartella.

## Flusso di lavoro

![](./doc/assets/flusso-di-lavoro.png)

### Setup iniziale

- esegui in fork del progetto dal repository di Fondazione Edulife
- lavora sul tuo fork personale

### Daily routine

- all'inizio di ogni lezione:
  - scaricati il master dal repository di Fondazione Edulife
  - crea un nuovo branch di lavoro sul tuo repo e svolgi gli esercizi su questo branch
- alla fine della lezione:
  - fai push del tuo branch
  - crea una Pull Request sul repository di Fondazione Edulife
