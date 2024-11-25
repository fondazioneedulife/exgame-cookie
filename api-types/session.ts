export type Session = {
    /**
     * Id generata dal database
     */
    _id: string;
  
    /**
     * Id dell'esame
     */
    exam_id: string;
  
    /**
     * Nome della classe a cui viene assegnata la sessione
     */
    student_class: string;
  
    /**
     * Data programmata per l'esame
     */
    start_date: Date;
  
    /**
     * Ora di inizio dell'esame
     */
    start_time: Date;

  };