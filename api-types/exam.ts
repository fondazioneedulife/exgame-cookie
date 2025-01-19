export type Exam = {
  /**
   * Id generata dal database
   */
  _id: string;

  /**
   * Nome
   */
  name: string;

  /**
   * data di creazione dell'esame
   */
  created_at: Date;

  /**
   * data di ultima modifica dell'esame
   */
  updated_at: Date;

  /**
   *id dell'insegnante che crea l'esame
   */
  created_by: string;

  /**
   *
   * array delle classi
   */
  classes: string[];

  /**
   * tempo massimo per fare l'esame
   */
  max_time: string;

  /**
   * array delle domande
   */
  questions: Question[];
};

export type Answer = {
  answer: string;
  isCorrect: boolean;
};

export type Question = {
  text: string;
  questionType: QuestionType;
  answers: Answer[];
};

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  BOOLEAN = "BOOLEAN",
  OPEN_ANSWER = "OPEN_ANSWER",
}
