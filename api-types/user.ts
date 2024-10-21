export type User = {
  /**
   * Id generata dal database
   */
  _id: string;
  /**
   * Name
   */
  first_name: string;
  /**
   * Last name
   */
  last_name: string;
  /**
   * Email
   */
  email: string;
  /**
   * Password, usata per l'autenticazione 
   * La password è criptata
   */
  password: string;
  /**
  * Rappresenta i corsi assegnati
  * ad un docente. Questa proprioetà è valorizzata
  * solo per i "role" teacher
  */
  subject?: string[];
  /**
   * Rappresenta le classi assegnate
   * ad un docente. Questa proprioetà è valorizzata
   * per i "role" teacher
  */
  classes: string[];
  /**
 * Rappresenta la classe a cui uno studente
 * appartiene. Questa proprioetà è valorizzata
 * per i "role" student
 */
  student_class?: string;
  image?: string;
  created_at: string;
  updated_at: string;
  /**
   * Può assumere i valori:
   * - admin
   * - teacher
   * - student
   */
  role: Role;
};


export type Role = "admin" | "teacher" | "student";