export type user = {
  /* ID generata dal database */
  _id: string;
  /* Nome */
  firstName: string;
  /* Cognome */
  lastName: string;
  /* E-mail, utilizzata per l'autenticazione */
  email: string;
  /* Password, usata per l'autenticazione; è criptata */
  password: string;
  /* Data di registrazione */
  created_at: string;
  /* Ultima modifica */
  updated_at?: string;      
  /* Ruolo (può assumere i valori: admin, teacher, student) */
  role: "admin" | "teacher" | "student";   
  /* immagine, è facolatitiva */            
  image?: string;
  /* Rappresenta i corsi assegnati a un docente. Questa proprietà è valorizzata solo per i "role" teacher */
  subjects?: string[];        
  /* Rappresenta le classi assegnate a un docente. Questa proprietà è valorizzata solo per i "role" teacher */   
  classes?: string[];
  /* Rappresenta la classe a cui uno studente appartiene. Questa proprietà è valorizzata solo per i "role" student */
  student_classe?: string;
};

export type Role = "admin" | "teacher" | "student";