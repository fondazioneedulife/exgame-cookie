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
    classes: [];
  
    /**
     * tempo massimo per fare l'esame
     */
    max_time: string;
    domande: [{}];
  };
  
  