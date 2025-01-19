import { Exam } from "../../../../../api-types";
import { config } from "../../../config";
import { useFetch } from "../../../lib/useFetch";
import { ExamForm } from "./examComponents/ExamForm";

export const AddExam: React.FC = () => {
  const fetch = useFetch();
  const onSave = (exam: Exam) => {
    fetch(`${config.API_BASEPATH}/exams`, {
      method: "POST",
      body: JSON.stringify(exam),
    });
    console.log("esame salvato", exam);
  };

  return <ExamForm onSave={onSave} />;
};
