export type User = {
  /**
   * id generata dal database
   */
  _id: string;

  /**name */
  firstName: string;

  /**surname*/
  lastName: string;

  /**Email, utilizzata per l'autenticazione */
  email: string;

  /**password usata per l'autenticazione: la password è criptata */
  password: string;

  /**data di registrazione */
  created_at: string;

  /**ultima modfica */
  updated_at: string;
  /**
   * puo assumere i valori:
   * admin
   * teacher
   * student
   */
  role: Role;


  image?: string;


  /**
   * Rappresenta...
   */
  subjects?: string;

  /**
   * Rappresenta le classi assegnate a un docente. è valorizzata solo per i "role" teacher
   */
  classes?: string;

  /**
   * Rappresenta la classe a cui uno studente appartiene. è valorizzato solo per i "role" student
   */
  student_class?: string;
};

export type Role = "admin" | "teacher" | "student";