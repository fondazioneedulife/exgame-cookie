export type User = {
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
   * Email
   */
  email: string;
  /**
   * Hash password
   */
  password: string;
  /**
   * Può assumere i valori:
   * - admin
   * - student
   * - teacher
   */
  role: "admin" | "teacher" | "student";

  created_at: string;
  updated_at: string;

  /**
   * Rappresenta i corsi assegnati a un docente.
   * Questa proprietà è valorizzata solo per i "role": teacher
   */
  subject?: string[];

  /**
   * Rappresenta le classi assegnate a un docente.
   * Questa proprietà è valorizzata solo per i "role": teacher
   */
  classes?: string[];

  /**
   * Rappresenta la classe di uno studente.
   * Questa proprietà è valorizzata solo per i "role": student
   */
  student_class?: string;

  /**
   * Immagime profilo
   */
  image?: string;
};
