import { useNavigate } from "react-router";
import { Exam } from "../../../../../api-types";
import { config } from "../../../config";
import { useFetch } from "../../../lib/useFetch";
import { ExamForm } from "./examComponents/ExamForm";

export const AddExam: React.FC = () => {
  const fetch = useFetch();
  const navigate = useNavigate();
  const onSave = (exam: Exam) => {
    fetch(`${config.API_BASEPATH}/exams`, {
      method: "POST",
      body: JSON.stringify(exam),
    });
    console.log("esame salvato", exam);
    navigate("/teacher");
  };

  return <ExamForm onSave={onSave} />;
};
