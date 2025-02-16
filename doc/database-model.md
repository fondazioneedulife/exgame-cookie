# Modellazione dei dati

![](./assets/database-model.png)

Il database (MongoDB) contiene 5 collections:

- **Users**: account degli utenti
- **Classes**: classi degli utenti
- **Exams**: elenco degli esami. Ogni esame contiene tutta la struttura dati necessaria: configurazione, domande e risposte
- **Session**: elenco delle sessioni, ogni sessione è collegata a un esame e a una classe. Contiene anche la data di svolgimento della sessione
- **Subscriptions**: elenco dei delle prove d'esame svolte dagli studenti. Ogni subscription contiene tutti i dati della prova: risposte date, azioni di disturbo compiute, domande al docente, ecc.
