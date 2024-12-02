import { User } from "./user";

export type Subscription = {
  /**
   * Identificatore univoco della sottoscrizione
   */
  _id: string;

  /**
   * Identificatore dello studente associato alla sottoscrizione
   */
  student_id: User;

  /**
   * Identificatore della sessione associata alla sottoscrizione
   */
  session_id: string;

  /**
   * Voto dello studente
   */
  grade: number;

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

export type StudentGrade = {
  first_name: string;
  last_name: string;
  grade: number;
}
