export type Exam = {
    /**
     * Id generata dal database
     */
    _id: string;
  
    /**
     * Nome
     */
    name: string;
  
    /**
     * data di creazione dell'esame
     */
    created_at: Date;

    /**
     * data di ultima modifica dell'esame
     */
    updated_at: Date;
  
    /**
     *id dell'insegnante che crea l'esame
     */
    created_by: string;
  
    /**
     * 
     * array delle classi
     */
    classes: string[];
  
    /**
     * tempo massimo per fare l'esame
     */
    max_time: string;

  
    /**
     * Rappresenta la classe a cui uno studente appartiene. E' valorizzato solo per i "role" student
     */
    domande: Array<{ question: string; options: string[]; answer: string }>;
  };
