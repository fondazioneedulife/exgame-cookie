export type Subscription = {
  /**
   * Identificatore univoco della sottoscrizione
   */
  _id: string;

  /**
   * Identificatore dello studente associato alla sottoscrizione
   */
  student_id: string;

  /**
   * Identificatore della sessione associata alla sottoscrizione
   */
  session_id: string;

  /**
   * Lista delle domande con le relative risposte fornite dallo studente
   */
  questions: {
    /**
     * Identificatore della domanda
     */
    question_id: string;

    /**
     * Lista delle risposte selezionate per la domanda
     */
    responses: {
      /**
       * Identificatore della risposta selezionata
       */
      answer_id: string;
    }[];
  }[];
};
