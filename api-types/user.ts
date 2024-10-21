export type User = {
  /**
   * Id generata dal database
   */
  _id: string;

  /**
   * Nome
   */
  first_name: string;

  /**
   * Cognome
   */
  last_name: string;

  /**
   * Email, utilizzata per l'autenticazione
   */
  email: string;

  /**
   * Password, usata per l'autenticazione
   * La password è criptata
   */
  password: string;

  /**
   * Data di registrazione
   */
  created_at: string;

  /**
   * Ultima modifica
   */
  updated_at: string;

  /**
   * Può assumere i valori:
   * - admin
   * - teacher
   * - student
   */
  role: Role;

  /**
   * Immagine, facoltativa
   */
  image?: string;

  /**
   * Rappresenta i corsi assegnati a un docente. Questa proprietà è valorizzata solo per i "role" teacher
   */
  subjects?: string[];

  /**
   * Rappresenta le classi assegnate a un docente. E' velorizzata solo per i "role" teacher
   */
  classes?: string[];

  /**
   * Rappresenta la classe a cui uno studente appartiene. E' valorizzato solo per i "role" student
   */
  student_class?: string;
};

export type Role = "admin" | "teacher" | "student";
