# Nomenclatura

- **Exam**: rappresenta un esame, è associato a un Teacher, contiene un oggetto di configurazione (n. copie ammesse, n. disturbi ammessi, tempo di esecuzione previsto...) e una collection di Questions (ciascuna Question contiene a sua volta una collection di Answers)
- **Teacher**: rappresenta l'utenza di un docente, che può gestire studenti, esami e subscription
- **Student**: rappresenta l'utenza di uno studente, che può partecipare a un esame tramite una Subscription
- **Question**: rappresenta una domanda, contiene un elenco di Answer
- **Answer**: rappresenta una opzione di risposta ad una domanda, contiene anche l'informazione **correct**, che identifica le risposte
- **Session**: rappresenta una sessione di esame, ovvero un raggrupamento di _Subscriptions_. Nella subscription sono descritti anche il giorno, l'orario di svolgimento della sessione, oltre alla classe di studenti.
- **Subscription**: rappresenta l'associazione di uno studente ad un esame e a una sessione, contiene tutte le Response che lo studente ha dato, le azioni di copia e disturbo che ha fatto durante la prova, le domande fatte al docente, ecc.
- **Response**: rappresenta una risposta data da uno studente ad una domanda, è associata ad una Answer (probabilmente conterrà anche un'associazione alla relativa Question)
