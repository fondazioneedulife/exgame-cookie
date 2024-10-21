export type user = {
  /**
   * id generato dal db
   */
  _id: string;
  /**
   * nome
   */
  first_name: string;
  /**
   * cognome
   */
  last_name: string;

  /**
   * email,utilizzata per l'autentificazione
   */
  email:string;
  /**
   * password,usata per l'autentificazione 
   * la password
   */
  password: string;
  created_at:string;
  update_at:string;
  /**
   * può assumere i valori:
   * -admin
   * -teacher
   * -student
   */
  role:Role;
  subjects?:string[];
  /**
   * rappresenta le classi asseggnate a un docente. È valorizzata solo per i role teacher 
   */
  image?: string;
  /**
   * rappresenta i corsi
   */
  classes?:string[];
  student_class?:string;
};

export type Role = "admin" | "teacher" | "student";