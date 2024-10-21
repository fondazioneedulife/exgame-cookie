export type User = {
  _id: string;
  /**
   * Nome
  */
  firstName: string;
  /**
   * Cognome
   */
  lastName: string;
  /**
   * Email, utilizzata per l'autenticazione
   */
  email: string;
  /**
   * Password, usata per l'autenticazione
   */
  password: string;
  /**
   * Data di creazione
   */
  created_at: string;
  /**
   * Data di modifica
   */
  updated_at: string;
  /**
   * Può assumere i valori:
   * - admin
   * - teacher
   * - student
   */
  role: "admin" | "teacher" | "student";
  image?: string;
  /**
   * Rappresenta i corsi assegnati a un docente. Questa proprietà è valorizzata solo per i "role" teacher
   */

  subjects?: string[];
  /**
   * Rapresenta le classi assegnate a un docente
   */
  classes?: string[];
  /**
   * Rappresenta la classe assegnata a un studente
   */
  student_class?: string;
};

export type Role = "admin" | "teacher" | "student";
