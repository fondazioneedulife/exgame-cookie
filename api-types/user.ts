export type User = {
  /**
   * Id generato dal db
   */
  _id: string;
  /**
   * name
   */
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  /**
   * Può assumere i valori:
   * - admin
   * - techer
   * - student
   */
  role: Role;
  image?: string;
  /**
   * Rappresenta i corsi assegnati ad un docente.
   * Questa proprietà è valorizzata solo per i "role" teachers.
   */
  subjects?: string[];
  classes?: string[];
  student_class?: string;
};

export type Role = "admin" | "teacher" | "student";
