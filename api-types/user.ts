export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  /**
   * Può assumere i valori:
   * - admin
   * - student
   * - teacher
   */
  role: "admin" | "teacher" | "student";
  created_at: string;
  modified_at: string;
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
  image?: string;
};
