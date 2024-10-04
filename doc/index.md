# Exgame - requisiti

## Obiettivi

Si intende realizzare un'applicazione web per svolgere esami o quiz, simulando l'esperienza di un esame in aula o di un compito in classe, con l'aggiunta di un po' di divertimento. In questa applicazione, infatti, si possono verificare alcune delle condizioni più tipiche di un esame in presenza, come ad esempio:

- uno studente cerca di copiare
- un compagno non ti lascia copiare
- qualcuno disturba in aula
- si possono fare domande al docente, che risponde a tutta la classe

## Requisiti funzionali

Gli attori del sistema sono docenti e studenti. I primi fungono da amministratori e i secondi da utenti registrati.

### User stories

Come Docente voglio:

- Creare gli account per gli studenti
- Registrare gli studenti agli esami, inmodo che possano partecipare agli esami che ho preparato per loro
- Creare nuovi esami e modificarli:
  - aggiungere domande
  - aggiungere risposte
  - contrassegnare le risposte corrette
  - impostare il numero di "copie" ammesse per ogni studente
  - impostare il numero di "blocco copia" ammesso per ogni studente
  - configurare il numero di azioni di disturbo ammesse per ogni studente
- Iniziare e terminare una sessione di esame
- Durante lo svolgimento, voglio poter rispondere alle domande degli studenti
- Visualizzare i risultati di ogni singolo studente
- Visualizzare un report dei risultati della classe, per avere una visione di insieme di com'è andata la prova d'esame

Come studente voglio:

- Accedere al sistema
- Visualizzare gli esami a cui devo partecipare e quelli che ho già sostenuto
- Partecipare a un esame
  - Rispondere alle domande
  - Copiare da un compagno
  - Attivare la funzione "blocca copia" (bloccherà solo alcuni studenti random)
  - Disturbare la classe (eventualmente scegliendo tra diversi tipi di disturbo)
  - Fare domande al docente
- Visualizzare l'esito della mia prova

### Diagramma degli use cases

![use cases](./assets/exgame%20-%20use%20cases.png)

## Requisiti tecnici

L'applicazione sarà sviluppata in Node.js, React e un database MongoDB.

Parallelamente, verrà sviluppato un piccolo sito di presentazione utilizzando Next.js.