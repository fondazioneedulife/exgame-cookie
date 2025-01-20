import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exam } from "../../../../../api-types";
import { config } from "../../../config";
import { useFetch } from "../../../lib/useFetch";
import { ExamForm } from "./examComponents/ExamForm";

export const EditExam: React.FC = () => {
  const { id } = useParams();//useParams ci permette di accedere ai parametri dell'URL
  const navigate = useNavigate();
  const fetch = useFetch();
  const [exam, setExam] = useState<Exam>();

  useEffect(() => {
    fetch(`${config.API_BASEPATH}/exams/${id}`)
      .then((res) => res?.json())
      .then(setExam)
      .catch(console.error);
  }, [id]);

  const onSave = (exam: Exam) => {
    fetch(`${config.API_BASEPATH}/exams/${id}`, {
      method: "put",
      body: JSON.stringify(exam),
    })
      .then(() => navigate("/teacher"))
      .catch(console.error);
    console.log("esame salvato", exam);
  };

  return exam ? <ExamForm onSave={onSave} exam={exam} /> : "Loading...";//se la variabile exam esiste, faccio vedere il form, altrimenti la scritta loading
};
